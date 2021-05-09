package com.ilopez.backend;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductConfig {
    @Bean
    CommandLineRunner clr(ProductRepository productRepo) {
        return args -> {
            Product phoneXL = new Product(1L,
                    "Phone XL",
                    799,
                    "A large phone with one of the best screens");
            Product phoneMini = new Product(2L,
                    "Phone Mini",
                    699,
                    "A great phone with one of the best cameras");
            productRepo.saveAll(List.of(phoneXL, phoneMini));
        };
    }
}
