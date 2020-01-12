package tr.com.khg.targettracer.service.impl;

import tr.com.khg.targettracer.service.TargetLogsService;
import tr.com.khg.targettracer.domain.TargetLogs;
import tr.com.khg.targettracer.repository.TargetLogsRepository;
import tr.com.khg.targettracer.service.dto.TargetLogsDTO;
import tr.com.khg.targettracer.service.mapper.TargetLogsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TargetLogs}.
 */
@Service
@Transactional
public class TargetLogsServiceImpl implements TargetLogsService {

    private final Logger log = LoggerFactory.getLogger(TargetLogsServiceImpl.class);

    private final TargetLogsRepository targetLogsRepository;

    private final TargetLogsMapper targetLogsMapper;

    public TargetLogsServiceImpl(TargetLogsRepository targetLogsRepository, TargetLogsMapper targetLogsMapper) {
        this.targetLogsRepository = targetLogsRepository;
        this.targetLogsMapper = targetLogsMapper;
    }

    /**
     * Save a targetLogs.
     *
     * @param targetLogsDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TargetLogsDTO save(TargetLogsDTO targetLogsDTO) {
        log.debug("Request to save TargetLogs : {}", targetLogsDTO);
        TargetLogs targetLogs = targetLogsMapper.toEntity(targetLogsDTO);
        targetLogs = targetLogsRepository.save(targetLogs);
        return targetLogsMapper.toDto(targetLogs);
    }

    /**
     * Get all the targetLogs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TargetLogsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TargetLogs");
        return targetLogsRepository.findAll(pageable)
            .map(targetLogsMapper::toDto);
    }


    /**
     * Get one targetLogs by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TargetLogsDTO> findOne(Long id) {
        log.debug("Request to get TargetLogs : {}", id);
        return targetLogsRepository.findById(id)
            .map(targetLogsMapper::toDto);
    }

    /**
     * Delete the targetLogs by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TargetLogs : {}", id);
        targetLogsRepository.deleteById(id);
    }
}
