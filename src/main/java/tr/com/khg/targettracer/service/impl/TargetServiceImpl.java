package tr.com.khg.targettracer.service.impl;

import tr.com.khg.targettracer.service.TargetService;
import tr.com.khg.targettracer.domain.Target;
import tr.com.khg.targettracer.repository.TargetRepository;
import tr.com.khg.targettracer.service.dto.TargetDTO;
import tr.com.khg.targettracer.service.mapper.TargetMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Target}.
 */
@Service
@Transactional
public class TargetServiceImpl implements TargetService {

    private final Logger log = LoggerFactory.getLogger(TargetServiceImpl.class);

    private final TargetRepository targetRepository;

    private final TargetMapper targetMapper;

    public TargetServiceImpl(TargetRepository targetRepository, TargetMapper targetMapper) {
        this.targetRepository = targetRepository;
        this.targetMapper = targetMapper;
    }

    /**
     * Save a target.
     *
     * @param targetDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TargetDTO save(TargetDTO targetDTO) {
        log.debug("Request to save Target : {}", targetDTO);
        Target target = targetMapper.toEntity(targetDTO);
        target = targetRepository.save(target);
        return targetMapper.toDto(target);
    }

    /**
     * Get all the targets.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TargetDTO> findAll() {
        log.debug("Request to get all Targets");
        return targetRepository.findAll().stream()
            .map(targetMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one target by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TargetDTO> findOne(Long id) {
        log.debug("Request to get Target : {}", id);
        return targetRepository.findById(id)
            .map(targetMapper::toDto);
    }

    /**
     * Delete the target by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Target : {}", id);
        targetRepository.deleteById(id);
    }
}
