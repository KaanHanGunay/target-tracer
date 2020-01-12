package tr.com.khg.targettracer.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link tr.com.khg.targettracer.domain.Target} entity.
 */
public class TargetDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private String name;

    private Integer successCount;

    private Integer dayCount;


    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSuccessCount() {
        return successCount;
    }

    public void setSuccessCount(Integer successCount) {
        this.successCount = successCount;
    }

    public Integer getDayCount() {
        return dayCount;
    }

    public void setDayCount(Integer dayCount) {
        this.dayCount = dayCount;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TargetDTO targetDTO = (TargetDTO) o;
        if (targetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), targetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TargetDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", successCount=" + getSuccessCount() +
            ", dayCount=" + getDayCount() +
            ", userId=" + getUserId() +
            "}";
    }
}
