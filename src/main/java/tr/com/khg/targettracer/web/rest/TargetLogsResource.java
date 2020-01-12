package tr.com.khg.targettracer.web.rest;

import tr.com.khg.targettracer.service.TargetLogsService;
import tr.com.khg.targettracer.web.rest.errors.BadRequestAlertException;
import tr.com.khg.targettracer.service.dto.TargetLogsDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link tr.com.khg.targettracer.domain.TargetLogs}.
 */
@RestController
@RequestMapping("/api")
public class TargetLogsResource {

    private final Logger log = LoggerFactory.getLogger(TargetLogsResource.class);

    private static final String ENTITY_NAME = "targetLogs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TargetLogsService targetLogsService;

    public TargetLogsResource(TargetLogsService targetLogsService) {
        this.targetLogsService = targetLogsService;
    }

    /**
     * {@code POST  /target-logs} : Create a new targetLogs.
     *
     * @param targetLogsDTO the targetLogsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new targetLogsDTO, or with status {@code 400 (Bad Request)} if the targetLogs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/target-logs")
    public ResponseEntity<TargetLogsDTO> createTargetLogs(@RequestBody TargetLogsDTO targetLogsDTO) throws URISyntaxException {
        log.debug("REST request to save TargetLogs : {}", targetLogsDTO);
        if (targetLogsDTO.getId() != null) {
            throw new BadRequestAlertException("A new targetLogs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TargetLogsDTO result = targetLogsService.save(targetLogsDTO);
        return ResponseEntity.created(new URI("/api/target-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /target-logs} : Updates an existing targetLogs.
     *
     * @param targetLogsDTO the targetLogsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated targetLogsDTO,
     * or with status {@code 400 (Bad Request)} if the targetLogsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the targetLogsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/target-logs")
    public ResponseEntity<TargetLogsDTO> updateTargetLogs(@RequestBody TargetLogsDTO targetLogsDTO) throws URISyntaxException {
        log.debug("REST request to update TargetLogs : {}", targetLogsDTO);
        if (targetLogsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TargetLogsDTO result = targetLogsService.save(targetLogsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, targetLogsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /target-logs} : get all the targetLogs.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of targetLogs in body.
     */
    @GetMapping("/target-logs")
    public ResponseEntity<List<TargetLogsDTO>> getAllTargetLogs(Pageable pageable) {
        log.debug("REST request to get a page of TargetLogs");
        Page<TargetLogsDTO> page = targetLogsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /target-logs/:id} : get the "id" targetLogs.
     *
     * @param id the id of the targetLogsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the targetLogsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/target-logs/{id}")
    public ResponseEntity<TargetLogsDTO> getTargetLogs(@PathVariable Long id) {
        log.debug("REST request to get TargetLogs : {}", id);
        Optional<TargetLogsDTO> targetLogsDTO = targetLogsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(targetLogsDTO);
    }

    /**
     * {@code DELETE  /target-logs/:id} : delete the "id" targetLogs.
     *
     * @param id the id of the targetLogsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/target-logs/{id}")
    public ResponseEntity<Void> deleteTargetLogs(@PathVariable Long id) {
        log.debug("REST request to delete TargetLogs : {}", id);
        targetLogsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
