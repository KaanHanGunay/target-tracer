package tr.com.khg.targettracer.web.rest;

import tr.com.khg.targettracer.service.TargetService;
import tr.com.khg.targettracer.web.rest.errors.BadRequestAlertException;
import tr.com.khg.targettracer.service.dto.TargetDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link tr.com.khg.targettracer.domain.Target}.
 */
@RestController
@RequestMapping("/api")
public class TargetResource {

    private final Logger log = LoggerFactory.getLogger(TargetResource.class);

    private static final String ENTITY_NAME = "target";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TargetService targetService;

    public TargetResource(TargetService targetService) {
        this.targetService = targetService;
    }

    /**
     * {@code POST  /targets} : Create a new target.
     *
     * @param targetDTO the targetDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new targetDTO, or with status {@code 400 (Bad Request)} if the target has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/targets")
    public ResponseEntity<TargetDTO> createTarget(@RequestBody TargetDTO targetDTO) throws URISyntaxException {
        log.debug("REST request to save Target : {}", targetDTO);
        if (targetDTO.getId() != null) {
            throw new BadRequestAlertException("A new target cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TargetDTO result = targetService.save(targetDTO);
        return ResponseEntity.created(new URI("/api/targets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /targets} : Updates an existing target.
     *
     * @param targetDTO the targetDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated targetDTO,
     * or with status {@code 400 (Bad Request)} if the targetDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the targetDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/targets")
    public ResponseEntity<TargetDTO> updateTarget(@RequestBody TargetDTO targetDTO) throws URISyntaxException {
        log.debug("REST request to update Target : {}", targetDTO);
        if (targetDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TargetDTO result = targetService.save(targetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, targetDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /targets} : get all the targets.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of targets in body.
     */
    @GetMapping("/targets")
    public List<TargetDTO> getAllTargets() {
        log.debug("REST request to get all Targets");
        return targetService.findAll();
    }

    /**
     * {@code GET  /targets/:id} : get the "id" target.
     *
     * @param id the id of the targetDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the targetDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/targets/{id}")
    public ResponseEntity<TargetDTO> getTarget(@PathVariable Long id) {
        log.debug("REST request to get Target : {}", id);
        Optional<TargetDTO> targetDTO = targetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(targetDTO);
    }

    /**
     * {@code DELETE  /targets/:id} : delete the "id" target.
     *
     * @param id the id of the targetDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/targets/{id}")
    public ResponseEntity<Void> deleteTarget(@PathVariable Long id) {
        log.debug("REST request to delete Target : {}", id);
        targetService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
