package tr.com.khg.targettracer.service.mapper;

import tr.com.khg.targettracer.domain.*;
import tr.com.khg.targettracer.service.dto.TargetLogsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TargetLogs} and its DTO {@link TargetLogsDTO}.
 */
@Mapper(componentModel = "spring", uses = {TargetMapper.class})
public interface TargetLogsMapper extends EntityMapper<TargetLogsDTO, TargetLogs> {

    @Mapping(source = "target.id", target = "targetId")
    TargetLogsDTO toDto(TargetLogs targetLogs);

    @Mapping(source = "targetId", target = "target")
    TargetLogs toEntity(TargetLogsDTO targetLogsDTO);

    default TargetLogs fromId(Long id) {
        if (id == null) {
            return null;
        }
        TargetLogs targetLogs = new TargetLogs();
        targetLogs.setId(id);
        return targetLogs;
    }
}
