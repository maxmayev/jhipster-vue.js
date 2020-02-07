package com.maxmayev.test.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "cost", nullable = false)
    private Long cost;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "picture_content_type")
    private String pictureContentType;

    @ManyToMany
    @JoinTable(name = "product_category_name",
               joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "category_name_id", referencedColumnName = "id"))
    private Set<Category> categoryNames = new HashSet<>();

    @ManyToMany(mappedBy = "productNames")
    @JsonIgnore
    private Set<Purchase> purchaseNames = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCost() {
        return cost;
    }

    public Product cost(Long cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Long cost) {
        this.cost = cost;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Product picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Product pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public Set<Category> getCategoryNames() {
        return categoryNames;
    }

    public Product categoryNames(Set<Category> categories) {
        this.categoryNames = categories;
        return this;
    }

    public Product addCategoryName(Category category) {
        this.categoryNames.add(category);
        category.getProductNames().add(this);
        return this;
    }

    public Product removeCategoryName(Category category) {
        this.categoryNames.remove(category);
        category.getProductNames().remove(this);
        return this;
    }

    public void setCategoryNames(Set<Category> categories) {
        this.categoryNames = categories;
    }

    public Set<Purchase> getPurchaseNames() {
        return purchaseNames;
    }

    public Product purchaseNames(Set<Purchase> purchases) {
        this.purchaseNames = purchases;
        return this;
    }

    public Product addPurchaseName(Purchase purchase) {
        this.purchaseNames.add(purchase);
        purchase.getProductNames().add(this);
        return this;
    }

    public Product removePurchaseName(Purchase purchase) {
        this.purchaseNames.remove(purchase);
        purchase.getProductNames().remove(this);
        return this;
    }

    public void setPurchaseNames(Set<Purchase> purchases) {
        this.purchaseNames = purchases;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", cost=" + getCost() +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            "}";
    }
}
