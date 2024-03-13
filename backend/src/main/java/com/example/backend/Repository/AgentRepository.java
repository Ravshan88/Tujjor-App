package com.example.backend.Repository;

import com.example.backend.Entity.Agent;
import com.example.backend.Projection.AgentProjection;
import com.example.backend.Projection.DealerAgentsProjection;
import jakarta.transaction.Transactional;
import org.apache.catalina.LifecycleState;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpEntity;

import java.util.List;
import java.util.UUID;

public interface AgentRepository extends JpaRepository<Agent, UUID> {
    @Query(value = """
            SELECT a.id  as agentid,
                u.id  as userid,
                a.username,
                u.phone,
                json_agg(
                    json_build_object(
                            'id', d.id,
                            'fullname', d.full_name
                        ) ORDER BY d.id
                    ) AS dealer
                 FROM agents a
                          INNER JOIN users u ON u.id = a.user_id
                          LEFT JOIN dealer_agents da on a.id = da.agents_id
                          LEFT JOIN dealer d on d.id = da.dealer_id
                 WHERE (LOWER(a.username) LIKE '%' || :search || '%')
                    OR (LOWER(u.phone) LIKE '%' || :search || '%')
                 GROUP BY a.id, u.id, a.username, u.phone
               """, nativeQuery = true)
    Page<AgentProjection> findAllByPagination(String search, Pageable pageable);

    Agent findByTelegramId(UUID telegramId);

    Agent findByUserPhone(String user_phone);

    @Query(value = """
               select a.username, u.phone
                   from agents a
                            inner join dealer_agents da on a.id = da.agents_id
                            inner join dealer d on d.id = da.dealer_id
                            inner join users u on u.id = a.user_id
                   where dealer_id = :dealerId
            """, nativeQuery = true)
    List<DealerAgentsProjection> getDealerAgents(UUID dealerId);

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE dealer_agents
                SET dealer_id = :dealerId
            WHERE agents_id = :agentId
                """, nativeQuery = true)
    void updateDealerForAgent(UUID agentId, UUID dealerId);

    @Modifying
    @Transactional
    @Query(value = """
                DELETE
                    FROM dealer_agents
                WHERE agents_id = :agentId
    """, nativeQuery = true)
    void deleteDealerFromAgent(UUID agentId);
}
