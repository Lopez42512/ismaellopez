package com.ilopez.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    private final ProductService ps;

    @Autowired
    public ProductController(ProductService ps) {
        this.ps = ps;
    }

    @GetMapping("/")
    public List<Product> getProducts() {
        return ps.getProduct();
    }

}