package tr.com.khg.targettracer.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link tr.com.khg.targettracer.domain.TargetLogs} entity.
 */
public class TargetLogsDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private LocalDate day;

    private Boolean isSuccess;


    private Long targetId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDay() {
        return day;
    }

    public void setDay(LocalDate day) {
        this.day = day;
    }

    public Boolean isIsSuccess() {
        return isSuccess;
    }

    public void setIsSuccess(Boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TargetLogsDTO targetLogsDTO = (TargetLogsDTO) o;
        if (targetLogsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), targetLogsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TargetLogsDTO{" +
            "id=" + getId() +
            ", day='" + getDay() + "'" +
            ", isSuccess='" + isIsSuccess() + "'" +
            ", targetId=" + getTargetId() +
            "}";
    }
}
