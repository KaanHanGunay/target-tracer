package tr.com.khg.targettracer.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class TargetLogsMapperTest {

    private TargetLogsMapper targetLogsMapper;

    @BeforeEach
    public void setUp() {
        targetLogsMapper = new TargetLogsMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(targetLogsMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(targetLogsMapper.fromId(null)).isNull();
    }
}
