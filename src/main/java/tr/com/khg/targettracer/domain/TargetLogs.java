package tr.com.khg.targettracer.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A TargetLogs.
 */
@Entity
@Table(name = "target_logs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TargetLogs extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day")
    private LocalDate day;

    @Column(name = "is_success")
    private Boolean isSuccess;

    @ManyToOne
    @JsonIgnoreProperties("targetLogs")
    private Target target;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDay() {
        return day;
    }

    public TargetLogs day(LocalDate day) {
        this.day = day;
        return this;
    }

    public void setDay(LocalDate day) {
        this.day = day;
    }

    public Boolean isIsSuccess() {
        return isSuccess;
    }

    public TargetLogs isSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
        return this;
    }

    public void setIsSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public Target getTarget() {
        return target;
    }

    public TargetLogs target(Target target) {
        this.target = target;
        return this;
    }

    public void setTarget(Target target) {
        this.target = target;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TargetLogs)) {
            return false;
        }
        return id != null && id.equals(((TargetLogs) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TargetLogs{" +
            "id=" + getId() +
            ", day='" + getDay() + "'" +
            ", isSuccess='" + isIsSuccess() + "'" +
            "}";
    }
}
