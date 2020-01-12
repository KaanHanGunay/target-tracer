package tr.com.khg.targettracer.service;

import tr.com.khg.targettracer.service.dto.TargetLogsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link tr.com.khg.targettracer.domain.TargetLogs}.
 */
public interface TargetLogsService {

    /**
     * Save a targetLogs.
     *
     * @param targetLogsDTO the entity to save.
     * @return the persisted entity.
     */
    TargetLogsDTO save(TargetLogsDTO targetLogsDTO);

    /**
     * Get all the targetLogs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TargetLogsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" targetLogs.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TargetLogsDTO> findOne(Long id);

    /**
     * Delete the "id" targetLogs.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
