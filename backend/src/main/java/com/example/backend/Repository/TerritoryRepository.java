package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Projection.TerritoryRegionProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TerritoryRepository extends JpaRepository<Territory, UUID> {


    @Query(value = "SELECT\n" +
            "    id,\n" +
            "    region,\n" +
            "    name,\n" +
            "    code,\n" +
            "    longitude,\n" +
            "    latitude,\n" +
            "    active,\n" +
            "    insertion_time\n" +
            "FROM\n" +
            "    territory t\n" +
            "WHERE (t.active IN :status OR :status IS NULL)\n" +
            "  AND lower(COALESCE(t.region, '') || ' ' || COALESCE(t.name, '') || ' ' || COALESCE(t.code, '')) LIKE lower(concat('%', :search, '%'))\n" +
            "AND t.archive=false\n"+
            "ORDER BY\n" +
            "    t.insertion_time DESC", nativeQuery = true)
    Page<TerritoryProjection> getFilteredData(String search, List<Boolean> status, Pageable pageable);

    @Query(nativeQuery = true, value = "select id,region,insertion_time from territory order by insertion_time desc")
    List<TerritoryRegionProjection> findAllRegion();

    @Query(value = """
            SELECT t.* 
            from territory t
            join currier_territory ct on t.id = ct.territory_id
            where ct.currier_id=:currierId
            """, nativeQuery = true)
    List<Territory> getTerritoriesByCurrier(UUID currierId);

    List<Territory> findAllByArchive(boolean archive);
}
