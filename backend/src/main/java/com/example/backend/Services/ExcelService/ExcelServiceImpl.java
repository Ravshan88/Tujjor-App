package com.example.backend.Services.ExcelService;

import com.example.backend.Entity.Currier;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Payload.Request.FilterData;
import com.example.backend.Projection.*;
import com.example.backend.Repository.*;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelServiceImpl implements ExcelService {
    private final UniversalServiceFilter universalServiceFilter;
    private final TerritoryRepository territoryRepository;
    private final CustomerCategoryRepository categoryRepository;
    private final CompanyRepository companyRepository;
    private final ClientRepository clientRepository;
    private final AgentRepository agentRepository;
    private final CurrierRepository currierRepository;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;


    @SneakyThrows
    @Override
    public ResponseEntity<Resource> getExcel(HttpServletRequest request, String[] headers, String component, HttpServletResponse response) {

        List<ExcelExportable> dataOfExcel = new ArrayList<>();

        FilterData filters = universalServiceFilter.generateFilterDataFromRequest(request);

        Pageable pageable = filters.getLimit().equals("All") || filters.getLimit().equals("") ? Pageable.unpaged() :
                PageRequest.of(filters.getPage(), Integer.parseInt(filters.getLimit()));

        getFilteredContentData(component, dataOfExcel, filters, pageable);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sheet");


        // Create a row for headers
        int rowNum = 0;
        Row headerRow = sheet.createRow(rowNum);

        generateHeaders(headerRow, headers, workbook, sheet); // generating headers

        generateBody(dataOfExcel, headers, ++rowNum, sheet);

        // Define header values
        autoSizeColumns(sheet);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        responseHeaders.add("Content-Disposition", "attachment; filename=example.xlsx");

        try {
            workbook.write(response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(responseHeaders)
                .body(resource);
    }

    @Override
    public void getFilteredContentData(String component, List<ExcelExportable> dataOfExcel, FilterData filters, Pageable pageable) {
        switch (component) {
            case "territory" -> {
                if (filters.getLimit().equals("All")) {
                    filters.setLimit(String.valueOf(territoryRepository.count()));
                }
                pageable = PageRequest.of(filters.getPage(), Integer.parseInt(filters.getLimit()));
                Page<TerritoryProjection> territories = territoryRepository.getFilteredData(filters.getQuickSearch(),
                        filters.getActive(), pageable);
                dataOfExcel.addAll(territories.getContent());
            }
            case "customer-category" -> {
                Page<CustomerCategoryProjection> categories = categoryRepository.findCustomerCategoryByActiveAndRegionName(filters.getQuickSearch(),
                        filters.getActive(), pageable);
                dataOfExcel.addAll(categories.getContent());
            }
            case "company-profile" -> dataOfExcel.addAll(companyRepository.findAll());
            case "clients" -> {
                Page<ClientProjection> filteredData = clientRepository.getAllFilteredFields(filters.getCities(), filters.getCustomerCategories(), filters.getActive(), filters.getTin(), filters.getQuickSearch(), filters.getPlan(), pageable);
                dataOfExcel.addAll(filteredData.getContent());


            }
            case "agent" -> {
                Page<AgentProjection> allByPagination = agentRepository.findAllByPagination(filters.getQuickSearch().toLowerCase(), pageable);
                dataOfExcel.addAll(allByPagination.getContent());
            }
            case "currier" -> {
                Page<CurrierProjection> carriers = currierRepository.getFilteredData(filters.getQuickSearch(),
                        filters.getActive(), pageable);
                dataOfExcel.addAll(carriers.getContent());
            }
            case "product" -> {
                Page<ProductProjection> products = productRepository.findAllByTitleContainingIgnoreCaseOrderByInsertionTimeDesc(filters.getQuickSearch(), pageable);
                dataOfExcel.addAll(products.getContent());
            }case "product-category" -> {
                Page<ProductCategoryProjection> products = productCategoryRepository.getFilteredData(filters.getQuickSearch(), pageable);
                dataOfExcel.addAll(products.getContent());
            }
        }
    }


    public static void generateBody(List<?> objects, String[] columns, int rowNum, Sheet sheet) throws NoSuchFieldException, IllegalAccessException {
        for (int i = 0; i < objects.size(); i++) {
            Row row = sheet.createRow(rowNum++);


            sheet.autoSizeColumn(rowNum);

            Object item = objects.get(i);

            for (int l = 0; l < columns.length; l++) {
                String col = columns[l].replaceAll("\"", "");

                Cell cell = row.createCell(l); // Create cell at the current column index
                Object o = getFieldValue(item, capitalizeFirstLetter(col));
                cell.setCellValue(o.toString());
            }
        }
    }

    public static void autoSizeColumns(Sheet sheet) {
        int numberOfColumns = sheet.getRow(0).getPhysicalNumberOfCells();
        for (int i = 0; i < numberOfColumns; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    public static void generateHeaders(Row headerRow, String[] headers, Workbook workbook, Sheet sheet) {
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            CellStyle cellStyle = workbook.createCellStyle();
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            cellStyle.setFillBackgroundColor(IndexedColors.GREY_80_PERCENT.getIndex());
            Font font = workbook.createFont();
            font.setColor(IndexedColors.WHITE.getIndex());
            cell.setCellStyle(cellStyle);
            cellStyle.setFont(font);
            cell.setCellValue(headers[i].replaceAll("\"", "")); // Set header value to value
            sheet.autoSizeColumn(0);
        }
    }

    public static Object getFieldValue(Object obj, String fieldName) {
        try {
            Method method = obj.getClass().getMethod("get" + capitalizeFirstLetter(fieldName));
            return method.invoke(obj);
        } catch (Exception e) {
            e.printStackTrace(); // Handle exceptions appropriately
            return null;
        }
    }

    public static String capitalizeFirstLetter(String input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }


}
