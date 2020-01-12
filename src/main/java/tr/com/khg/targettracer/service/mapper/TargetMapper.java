package tr.com.khg.targettracer.service.mapper;

import tr.com.khg.targettracer.domain.*;
import tr.com.khg.targettracer.service.dto.TargetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Target} and its DTO {@link TargetDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface TargetMapper extends EntityMapper<TargetDTO, Target> {

    @Mapping(source = "user.id", target = "userId")
    TargetDTO toDto(Target target);

    @Mapping(source = "userId", target = "user")
    Target toEntity(TargetDTO targetDTO);

    default Target fromId(Long id) {
        if (id == null) {
            return null;
        }
        Target target = new Target();
        target.setId(id);
        return target;
    }
}
