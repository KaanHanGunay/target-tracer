package tr.com.khg.targettracer.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class TargetMapperTest {

    private TargetMapper targetMapper;

    @BeforeEach
    public void setUp() {
        targetMapper = new TargetMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(targetMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(targetMapper.fromId(null)).isNull();
    }
}
