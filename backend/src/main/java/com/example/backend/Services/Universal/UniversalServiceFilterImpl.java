package com.example.backend.Services.Universal;

import com.example.backend.Entity.Currier;
import com.example.backend.Entity.Icons;
import com.example.backend.Entity.Product;
import com.example.backend.Entity.ProductCategory;
import com.example.backend.Payload.Request.FilterData;
import com.example.backend.Projection.*;
import com.example.backend.Repository.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UniversalServiceFilterImpl implements UniversalServiceFilter {
    private final ClientRepository clientRepository;
    private final TerritoryRepository territoryRepository;
    private final CustomerCategoryRepository customerCategoryRepository;
    private final AgentRepository agentRepository;
    private final CurrierRepository currierRepository;
    private final DealerRepository dealerRepository;
    private final IconsRepo iconsRepo;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;

    @SneakyThrows
    @Override
    public JsonNode wrapToObject(HttpServletRequest request) {
        String searchParam = request.getHeader("searchParam");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(searchParam);
    }

    @Override
    public boolean validateParams(Integer page, String limit) {
        return !limit.equals("All") && (page == null || page < 0 || Integer.parseInt(limit) < 1);
    }

    @SneakyThrows
    public FilterData generateFilterDataFromRequest(HttpServletRequest request) {
        FilterData filterData = new FilterData();
        JsonNode jsonNode = wrapToObject(request);
        JsonNode cityArrayNode = jsonNode.get("city");
        JsonNode jsonNodeLimit = jsonNode.get("limit");
        JsonNode jsonNodeCurrentPage = jsonNode.get("page");
        int currentPageValue = (jsonNodeCurrentPage != null && !jsonNodeCurrentPage.isNull()) ? jsonNodeCurrentPage.asInt() - 1 : 0;
        List<UUID> cities = new ArrayList<>();
        if (cityArrayNode != null) {
            for (JsonNode cityNode : cityArrayNode) {
                UUID cityId = UUID.fromString(cityNode.asText());
                cities.add(cityId);
            }
            filterData.setCities(cities);
        }


        List<Boolean> active = new ArrayList<>();
        JsonNode activeNode = jsonNode.get("active");
        if (activeNode != null) {

            for (JsonNode activeNodeArr : activeNode) {
                Boolean x = activeNodeArr.asBoolean();
                active.add(x);
            }
        }
        JsonNode categoryArray = jsonNode.get("customerCategories");
        JsonNode planNode = jsonNode.get("plan");
        List<Integer> customerCategoriesParam = new ArrayList<>();
        if (categoryArray != null) {
            for (JsonNode cityNode : categoryArray) {
                customerCategoriesParam.add(cityNode.asInt());
            }
        }
        JsonNode jsonNodeTin = jsonNode.get("tin");
        JsonNode jsonNodeQuickSearch = jsonNode.get("quickSearch");

        return FilterData.builder()
                .tin(jsonNodeTin == null ? "" : jsonNodeTin.asText())
                .active(active)
                .cities(cities)
                .quickSearch(jsonNodeQuickSearch == null ? "" : jsonNodeQuickSearch.asText())
                .page(currentPageValue)
                .plan(planNode == null ? "" : planNode.asText())
                .customerCategories(customerCategoriesParam)
                .limit(jsonNodeLimit == null ? "All" : jsonNodeLimit.asText())
                .build();
    }


    public HttpEntity<?> pagination(Integer page, String limit, HttpServletRequest request, String component) {
        if (validateParams(page, limit)) {
            return ResponseEntity.badRequest().body("Invalid page or limit value");
        }
        Pageable pageable = limit.equals("All") ? Pageable.unpaged() :
                PageRequest.of(page, Integer.parseInt(limit));

        FilterData params = generateFilterDataFromRequest(request);

        PaginationConfig paginationConfig = PaginationConfig.builder()
                .component(component)
                .pageable(pageable)
                .filterData(params)
                .pagination(Page.empty())
                .build();
        generateComponentData(paginationConfig);


        return ResponseEntity.ok(paginationConfig.getPagination());
    }

    public void generateComponentData(PaginationConfig config) {
        FilterData params = config.getFilterData();
        Pageable pageable = config.getPageable();

        switch (config.getComponent()) {
            case "clients" ->
                    config.setPagination(clientRepository.getAllFilteredFields(params.getCities(), params.getCustomerCategories(), params.getActive(), params.getTin(), params.getQuickSearch(), params.getPlan(), pageable));
            case "territory" -> {
                Page<TerritoryProjection> filteredData = territoryRepository.getFilteredData(params.getQuickSearch(), params.getActive(), pageable);
                config.setPagination(filteredData);
            }
            case "customer_category" ->
                    config.setPagination(customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(params.getQuickSearch(), params.getActive(), pageable));
            case "agents" ->
                    config.setPagination(agentRepository.findAllByPagination(params.getQuickSearch().toLowerCase(), pageable));
            case "currier" -> {
                Page<CurrierProjection> filteredData = currierRepository.getFilteredData(params.getQuickSearch(), params.getActive(), pageable);
                config.setPagination(filteredData);
            }
            case "dealer" -> {
                Page<DealerProjection> filteredData = dealerRepository.getFilteredData(params.getQuickSearch().toLowerCase(), pageable);
                config.setPagination(filteredData);
            }
            case "icons" -> {
                Page<Icons> filteredData = iconsRepo.findAllByNameContainingIgnoreCaseOrderByInsertionTimeDesc(params.getQuickSearch().toLowerCase(), pageable);
                config.setPagination(filteredData);
            }
            case "product" -> {
                Page<ProductProjection> filteredData = productRepository.findAllByTitleContainingIgnoreCaseOrderByInsertionTimeDesc(params.getQuickSearch().toLowerCase(), pageable);
                config.setPagination(filteredData);
            }case "product-category" -> {
                Page<ProductCategoryProjection> filteredData = productCategoryRepository.getFilteredData(params.getQuickSearch().toLowerCase(), pageable);
                config.setPagination(filteredData);
            }
        }
    }
}