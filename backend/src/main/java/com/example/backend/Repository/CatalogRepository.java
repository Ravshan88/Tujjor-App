package com.example.backend.Repository;

import com.example.backend.Entity.Catalog;
import com.example.backend.Projection.AddCatalogProductProjection;
import com.example.backend.Projection.CatalogProductAboutProjection;
import com.example.backend.Projection.CatalogProductProjection;
import com.example.backend.Projection.CatalogProjection;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CatalogRepository extends JpaRepository<Catalog, UUID> {
    @Query(value = """
            SELECT c.id, c.name, count(cp.catalog_id)
            FROM catalog c
                        LEFT JOIN catalog_products cp on c.id = cp.catalog_id
            GROUP BY c.id, c.name
            """, nativeQuery = true)
    List<CatalogProjection> getCatalogs();

    @Query(value = """
            SELECT c.id, c.name, count(cp.catalog_id)
            FROM catalog c
                     LEFT JOIN catalog_products cp on c.id = cp.catalog_id
            WHERE lower(c.name) LIKE '%' || lower(:catalogQuickSearch) || '%'
            GROUP BY c.id, c.name
                """, nativeQuery = true)
    List<CatalogProjection> getCatalogsWithFilter(String catalogQuickSearch);

    @Query(value = """
            SELECT cp.catalog_id, cp.products_id, p.title, p.attachment_id
            FROM product p
                     INNER JOIN product_category pc on p.category_id = pc.id
                     INNER JOIN catalog_products cp on p.id = cp.products_id
            WHERE cp.catalog_id = :catalogId
                """, nativeQuery = true)
    List<CatalogProductProjection> getCatalogProducts(UUID catalogId);

    @Modifying
    @Transactional
    @Query(value = """
            DELETE FROM catalog_products cp
            WHERE cp.catalog_id = :catalogId    
              AND cp.products_id = :productId           
            """, nativeQuery = true)
    void deleteCatalogProduct(UUID catalogId, UUID productId);

    @Query(value = """
            SELECT cp.catalog_id, cp.products_id, p.title, p.attachment_id
            FROM product p
                     INNER JOIN product_category pc ON p.category_id = pc.id
                     INNER JOIN catalog_products cp ON p.id = cp.products_id
            WHERE cp.catalog_id = :catalogId
              AND (
                    (:catalogProductQuickSearch IS NULL OR
                     lower(COALESCE(p.title, '')) LIKE lower(concat('%', :catalogProductQuickSearch, '%')))
                    AND
                    (
                            ((:selectedProductCategory IS NULL OR :selectedProductCategory = 'null') OR pc.id = CAST(COALESCE(:selectedProductCategory, null) AS UUID))
                            AND
                            (:catalogProductQuickSearch IS NOT NULL AND :selectedProductCategory IS NOT NULL OR true)
                        )
                )
                """, nativeQuery = true)
    List<CatalogProductProjection> getCatalogProductsWithFilter(String catalogProductQuickSearch, String selectedProductCategory, UUID catalogId);

    @Query(value = """
            SELECT p.id, p.attachment_id, p.title, p.price, pc.name AS category
            FROM product p
                     INNER JOIN product_category pc on p.category_id = pc.id
            WHERE p.id = :productId
            """, nativeQuery = true)
    CatalogProductAboutProjection getCatalogProduct(UUID productId);

    @Query(value = """
            SELECT p.id,
                   p.attachment_id,
                   p.title,
                   p.price,
                   pc.name AS category,
                   CASE
                       WHEN exists_in_catalog > 0 THEN true
                       ELSE false
                       END AS is_in_catalog
            FROM product p
                     INNER JOIN product_category pc ON p.category_id = pc.id
                     LEFT JOIN (SELECT products_id, COUNT(*) AS exists_in_catalog
                                FROM catalog_products
                                WHERE catalog_id = :catalogId
                                GROUP BY products_id) cp ON p.id = cp.products_id
            WHERE (
                          (:catalogProductQuickSearch IS NULL OR
                           lower(COALESCE(p.title, '')) LIKE lower(concat('%', :catalogProductQuickSearch, '%')))
                          AND
                          (
                                  ((:selectedProductCategory IS NULL OR :selectedProductCategory = 'null') OR
                                   pc.id = CAST(COALESCE(:selectedProductCategory, null) AS UUID))
                                  AND
                                  (:catalogProductQuickSearch IS NOT NULL AND :selectedProductCategory IS NOT NULL OR true)
                              )
                      );                                                                                 
            """, nativeQuery = true)
    List<AddCatalogProductProjection> getCatalogProductsForAddCatalogProduct(String catalogProductQuickSearch, String selectedProductCategory, UUID catalogId);

    @Modifying
    @Transactional
    @Query(value = """
                INSERT INTO catalog_products (catalog_id, products_id)
                    VALUES (:catalogId, :productId);                                                                                                                 
            """, nativeQuery = true)
    void addProductToCatalog(UUID catalogId, UUID productId);
}
