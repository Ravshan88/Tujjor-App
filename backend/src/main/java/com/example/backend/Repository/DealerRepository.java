package com.example.backend.Repository;

import com.example.backend.Entity.Dealer;
import com.example.backend.Projection.DealerProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface DealerRepository extends JpaRepository<Dealer, UUID> {
    Dealer findByTelegramId(UUID id);

    Dealer findByUserPhone(String user_phone);

    @Query(value = """
            select d.id,
                   d.full_name,
                   d.address,
                   d.company,
                   d.own_agents,
                   d.partnership,
                   u.phone as phone_number,
                   d.bot_active,
                   json_agg(
                           json_build_object(
                                   'id', a.id,
                                   'username', a.username
                               ) ORDER BY a.id
                       )   AS agents
            from dealer d
                     inner join users u on u.id = d.user_id
                     left join dealer_agents da on d.id = da.dealer_id
                     left join agents a on a.id = da.agents_id
            where lower(COALESCE(d.full_name, '') || ' ' || COALESCE(d.address, '') || ' ' || COALESCE(d.company, '')) LIKE
                  lower(concat('%', :quickSearch, '%'))
            group by d.id, d.full_name, d.address, d.company, d.own_agents, d.partnership, u.phone, d.insertion_time
            order by d.insertion_time desc
                        """, nativeQuery = true)
    Page<DealerProjection> getFilteredData(String quickSearch, Pageable pageable);

    Optional<Dealer> findByPhoneNumber(String phone);
}
