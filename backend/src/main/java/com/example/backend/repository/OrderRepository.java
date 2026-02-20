package com.example.backend.repository;

import com.example.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("""
        select 
            o.id as orderId,
            o.createdAt as createdAt,
            coalesce(sum(oi.price * oi.quantity), 0) as totalPrice
        from Order o
        left join OrderItem oi on oi.order = o
        where o.userId = :userId
        group by o.id, o.createdAt
        order by o.createdAt desc
    """)
    List<OrderSummaryProjection> findOrderSummariesByUserId(@Param("userId") Long userId);
}