package tr.com.khg.targettracer.web.rest;

import tr.com.khg.targettracer.TargettracerApp;
import tr.com.khg.targettracer.domain.TargetLogs;
import tr.com.khg.targettracer.repository.TargetLogsRepository;
import tr.com.khg.targettracer.service.TargetLogsService;
import tr.com.khg.targettracer.service.dto.TargetLogsDTO;
import tr.com.khg.targettracer.service.mapper.TargetLogsMapper;
import tr.com.khg.targettracer.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static tr.com.khg.targettracer.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TargetLogsResource} REST controller.
 */
@SpringBootTest(classes = TargettracerApp.class)
public class TargetLogsResourceIT {

    private static final LocalDate DEFAULT_DAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DAY = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_IS_SUCCESS = false;
    private static final Boolean UPDATED_IS_SUCCESS = true;

    @Autowired
    private TargetLogsRepository targetLogsRepository;

    @Autowired
    private TargetLogsMapper targetLogsMapper;

    @Autowired
    private TargetLogsService targetLogsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTargetLogsMockMvc;

    private TargetLogs targetLogs;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TargetLogsResource targetLogsResource = new TargetLogsResource(targetLogsService);
        this.restTargetLogsMockMvc = MockMvcBuilders.standaloneSetup(targetLogsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TargetLogs createEntity(EntityManager em) {
        TargetLogs targetLogs = new TargetLogs()
            .day(DEFAULT_DAY)
            .isSuccess(DEFAULT_IS_SUCCESS);
        return targetLogs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TargetLogs createUpdatedEntity(EntityManager em) {
        TargetLogs targetLogs = new TargetLogs()
            .day(UPDATED_DAY)
            .isSuccess(UPDATED_IS_SUCCESS);
        return targetLogs;
    }

    @BeforeEach
    public void initTest() {
        targetLogs = createEntity(em);
    }

    @Test
    @Transactional
    public void createTargetLogs() throws Exception {
        int databaseSizeBeforeCreate = targetLogsRepository.findAll().size();

        // Create the TargetLogs
        TargetLogsDTO targetLogsDTO = targetLogsMapper.toDto(targetLogs);
        restTargetLogsMockMvc.perform(post("/api/target-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(targetLogsDTO)))
            .andExpect(status().isCreated());

        // Validate the TargetLogs in the database
        List<TargetLogs> targetLogsList = targetLogsRepository.findAll();
        assertThat(targetLogsList).hasSize(databaseSizeBeforeCreate + 1);
        TargetLogs testTargetLogs = targetLogsList.get(targetLogsList.size() - 1);
        assertThat(testTargetLogs.getDay()).isEqualTo(DEFAULT_DAY);
        assertThat(testTargetLogs.isIsSuccess()).isEqualTo(DEFAULT_IS_SUCCESS);
    }

    @Test
    @Transactional
    public void createTargetLogsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = targetLogsRepository.findAll().size();

        // Create the TargetLogs with an existing ID
        targetLogs.setId(1L);
        TargetLogsDTO targetLogsDTO = targetLogsMapper.toDto(targetLogs);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTargetLogsMockMvc.perform(post("/api/target-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(targetLogsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TargetLogs in the database
        List<TargetLogs> targetLogsList = targetLogsRepository.findAll();
        assertThat(targetLogsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTargetLogs() throws Exception {
        // Initialize the database
        targetLogsRepository.saveAndFlush(targetLogs);

        // Get all the targetLogsList
        restTargetLogsMockMvc.perform(get("/api/target-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(targetLogs.getId().intValue())))
            .andExpect(jsonPath("$.[*].day").value(hasItem(DEFAULT_DAY.toString())))
            .andExpect(jsonPath("$.[*].isSuccess").value(hasItem(DEFAULT_IS_SUCCESS.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getTargetLogs() throws Exception {
        // Initialize the database
        targetLogsRepository.saveAndFlush(targetLogs);

        // Get the targetLogs
        restTargetLogsMockMvc.perform(get("/api/target-logs/{id}", targetLogs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(targetLogs.getId().intValue()))
            .andExpect(jsonPath("$.day").value(DEFAULT_DAY.toString()))
            .andExpect(jsonPath("$.isSuccess").value(DEFAULT_IS_SUCCESS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTargetLogs() throws Exception {
        // Get the targetLogs
        restTargetLogsMockMvc.perform(get("/api/target-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTargetLogs() throws Exception {
        // Initialize the database
        targetLogsRepository.saveAndFlush(targetLogs);

        int databaseSizeBeforeUpdate = targetLogsRepository.findAll().size();

        // Update the targetLogs
        TargetLogs updatedTargetLogs = targetLogsRepository.findById(targetLogs.getId()).get();
        // Disconnect from session so that the updates on updatedTargetLogs are not directly saved in db
        em.detach(updatedTargetLogs);
        updatedTargetLogs
            .day(UPDATED_DAY)
            .isSuccess(UPDATED_IS_SUCCESS);
        TargetLogsDTO targetLogsDTO = targetLogsMapper.toDto(updatedTargetLogs);

        restTargetLogsMockMvc.perform(put("/api/target-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(targetLogsDTO)))
            .andExpect(status().isOk());

        // Validate the TargetLogs in the database
        List<TargetLogs> targetLogsList = targetLogsRepository.findAll();
        assertThat(targetLogsList).hasSize(databaseSizeBeforeUpdate);
        TargetLogs testTargetLogs = targetLogsList.get(targetLogsList.size() - 1);
        assertThat(testTargetLogs.getDay()).isEqualTo(UPDATED_DAY);
        assertThat(testTargetLogs.isIsSuccess()).isEqualTo(UPDATED_IS_SUCCESS);
    }

    @Test
    @Transactional
    public void updateNonExistingTargetLogs() throws Exception {
        int databaseSizeBeforeUpdate = targetLogsRepository.findAll().size();

        // Create the TargetLogs
        TargetLogsDTO targetLogsDTO = targetLogsMapper.toDto(targetLogs);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTargetLogsMockMvc.perform(put("/api/target-logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(targetLogsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TargetLogs in the database
        List<TargetLogs> targetLogsList = targetLogsRepository.findAll();
        assertThat(targetLogsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTargetLogs() throws Exception {
        // Initialize the database
        targetLogsRepository.saveAndFlush(targetLogs);

        int databaseSizeBeforeDelete = targetLogsRepository.findAll().size();

        // Delete the targetLogs
        restTargetLogsMockMvc.perform(delete("/api/target-logs/{id}", targetLogs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TargetLogs> targetLogsList = targetLogsRepository.findAll();
        assertThat(targetLogsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
