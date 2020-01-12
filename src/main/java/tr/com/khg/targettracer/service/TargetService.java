package tr.com.khg.targettracer.service;

import tr.com.khg.targettracer.service.dto.TargetDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link tr.com.khg.targettracer.domain.Target}.
 */
public interface TargetService {

    /**
     * Save a target.
     *
     * @param targetDTO the entity to save.
     * @return the persisted entity.
     */
    TargetDTO save(TargetDTO targetDTO);

    /**
     * Get all the targets.
     *
     * @return the list of entities.
     */
    List<TargetDTO> findAll();


    /**
     * Get the "id" target.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TargetDTO> findOne(Long id);

    /**
     * Delete the "id" target.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
