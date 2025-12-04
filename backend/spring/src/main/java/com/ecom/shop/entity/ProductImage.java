package com.ecom.shop.entity;

/**
 * Common interface for product image entities so mapper can work with both types.
 * Keep the interface limited to the shared getters (exclude the id field which differs).
 */
public interface ProductImage {
    String getImageUrl();
    String getText();
    String getSortOrder();
    Boolean getIsMain();
}

