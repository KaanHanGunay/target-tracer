package tr.com.khg.targettracer.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Target.
 */
@Entity
@Table(name = "target")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Target extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "success_count")
    private Integer successCount;

    @Column(name = "day_count")
    private Integer dayCount;

    @ManyToOne
    @JsonIgnoreProperties("targets")
    private User user;

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

    public Target name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSuccessCount() {
        return successCount;
    }

    public Target successCount(Integer successCount) {
        this.successCount = successCount;
        return this;
    }

    public void setSuccessCount(Integer successCount) {
        this.successCount = successCount;
    }

    public Integer getDayCount() {
        return dayCount;
    }

    public Target dayCount(Integer dayCount) {
        this.dayCount = dayCount;
        return this;
    }

    public void setDayCount(Integer dayCount) {
        this.dayCount = dayCount;
    }

    public User getUser() {
        return user;
    }

    public Target user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Target)) {
            return false;
        }
        return id != null && id.equals(((Target) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Target{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", successCount=" + getSuccessCount() +
            ", dayCount=" + getDayCount() +
            "}";
    }
}
