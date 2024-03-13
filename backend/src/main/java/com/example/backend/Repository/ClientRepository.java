package com.example.backend.Repository;


import com.example.backend.Entity.Client;
import com.example.backend.Projection.ClientCourierProjection;
import com.example.backend.Projection.ClientForMapProjection;
import com.example.backend.Projection.ClientProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {

    Client findByTelegramId(UUID id);

    Optional<Client> findByUserPhone(String phone);
    @Query(nativeQuery = true, value = """
                SELECT c.insertion_time,
                       c.id,
                       t.id                as territoryId,
                       cc.id               as categoryId,
                       c.tin,
                       c.name,
                       c.company_name      AS companyName,
                       u.phone,
                       c.latitude,
                       c.longitude,
                       c.address,
                       c.bot_active,
                       c.active,
                       c.tin,
                       c.registration_date AS registrationDate,
                       t.region            AS city,
                       cc.name             as categoryName,
                       cc.attachment_id    as image,
                       json_agg(
                               json_build_object(
                                       'id', cu.id,
                                       'username', cu.username
                                   ) ORDER BY cu.id
                           )               AS couriers
                FROM client c
                         LEFT JOIN
                     territory t ON c.territory_id = t.id
                         LEFT JOIN users u ON c.user_id = u.id
                         LEFT JOIN
                     customer_category cc ON cc.id = c.category_id
                         LEFT JOIN client_courier cc2 on c.id = cc2.client_id
                         LEFT JOIN currier cu on cc2.courier_id = cu.id
                WHERE (t.id IN :city OR :city IS NULL)
                  and (cc.id IN :category OR :category IS NULL)
                  and (c.active IN :active OR :active IS NULL)
                  AND CASE
                          WHEN :tin = 'true' THEN c.tin <> ''
                          WHEN :tin = 'false' THEN c.tin IS NULL OR c.tin = ''
                          ElSE true
                    END
                  AND (
                            LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))
                        OR LOWER(u.phone) LIKE LOWER(CONCAT('%', :search, '%'))
                        OR LOWER(c.company_name) LIKE LOWER(CONCAT('%', :search, '%'))
                    )
                  AND (
                    CASE
                        WHEN :plan = 'true' THEN c.id IN (SELECT cp.client_id FROM client_plan cp)
                        WHEN :plan = 'false' THEN c.id NOT IN (SELECT cp.client_id FROM client_plan cp)
                        ELSE true
                        END
                    )
                GROUP BY c.insertion_time, c.id, t.id, cc.id, c.tin, c.name, c.company_name, u.phone, c.latitude, c.longitude,
                         c.address, c.active, c.tin, c.registration_date, t.region, cc.name, cc.attachment_id
                ORDER BY c.insertion_time DESC
            """)
    Page<ClientProjection> getAllFilteredFields(List<UUID> city, List<Integer> category, List<Boolean> active, String tin, String search, String plan, Pageable pageable);


    @Query(value = """
                SELECT c.insertion_time,
                       c.id,
                       t.id as territoryId,
                       cc.id as categoryId,
                       c.tin,
                       c.name,
                       c.company_name AS companyName,
                       u.phone,
                       c.latitude,
                       c.longitude,
                       c.address,
                       c.active,
                       c.tin,
                       c.registration_date AS registrationDate,
                       t.region AS city,
                       cc.name as categoryName,
                       cc.attachment_id as image,
                       latest_plans.amount as amount,
                       latest_plans.date as plan_date
                FROM client c 
                LEFT JOIN territory t ON c.territory_id = t.id
                LEFT JOIN customer_category cc ON cc.id = c.category_id
                LEFT JOIN users u ON c.user_id = u.id
                LEFT JOIN (
                    SELECT cp.client_id,
                           cp.amount,
                           cp.date,
                           cp.created_date AS latest_created_date
                    FROM client_plan cp
                    WHERE extract('MONTH' from cp.date)=extract('MONTH' from now()) and extract('YEAR' from cp.date)=extract('YEAR' from now())
                ) latest_plans ON c.id = latest_plans.client_id
                WHERE 
                (:allCity = true OR (t.region IN :cities))
                AND (LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')))
                ORDER BY c.insertion_time DESC
            """, nativeQuery = true)
    List<ClientForMapProjection> getClientsForMap(List<String> cities, String search, Boolean allCity);

    @Query(value = """
            select c.firstname || ' ' || c.lastname as full_name, u.phone
            from currier c
                     inner join users u on u.id = c.user_id
                     inner join client_courier cc on c.id = cc.courier_id
            where cc.client_id = :clientId
            """, nativeQuery = true)
    List<ClientCourierProjection> getClientCouriers(UUID clientId);
}
