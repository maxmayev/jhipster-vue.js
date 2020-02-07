package com.maxmayev.test.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Purchase.
 */
@Entity
@Table(name = "purchase")
public class Purchase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @ManyToOne
    @JsonIgnoreProperties("purchases")
    private Consumer consumerName;

    @ManyToMany
    @JoinTable(name = "purchase_product_name",
               joinColumns = @JoinColumn(name = "purchase_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "product_name_id", referencedColumnName = "id"))
    private Set<Product> productNames = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public Purchase orderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Consumer getConsumerName() {
        return consumerName;
    }

    public Purchase consumerName(Consumer consumer) {
        this.consumerName = consumer;
        return this;
    }

    public void setConsumerName(Consumer consumer) {
        this.consumerName = consumer;
    }

    public Set<Product> getProductNames() {
        return productNames;
    }

    public Purchase productNames(Set<Product> products) {
        this.productNames = products;
        return this;
    }

    public Purchase addProductName(Product product) {
        this.productNames.add(product);
        product.getPurchaseNames().add(this);
        return this;
    }

    public Purchase removeProductName(Product product) {
        this.productNames.remove(product);
        product.getPurchaseNames().remove(this);
        return this;
    }

    public void setProductNames(Set<Product> products) {
        this.productNames = products;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Purchase)) {
            return false;
        }
        return id != null && id.equals(((Purchase) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Purchase{" +
            "id=" + getId() +
            ", orderDate='" + getOrderDate() + "'" +
            "}";
    }
}
