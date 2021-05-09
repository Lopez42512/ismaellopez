package com.ilopez.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepo;

    @Autowired

    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }
    public List<Product> getProduct(){
        return productRepo.findAll();
    }    
}