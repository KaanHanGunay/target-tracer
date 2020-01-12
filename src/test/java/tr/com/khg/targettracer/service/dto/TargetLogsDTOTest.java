package tr.com.khg.targettracer.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import tr.com.khg.targettracer.web.rest.TestUtil;

public class TargetLogsDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TargetLogsDTO.class);
        TargetLogsDTO targetLogsDTO1 = new TargetLogsDTO();
        targetLogsDTO1.setId(1L);
        TargetLogsDTO targetLogsDTO2 = new TargetLogsDTO();
        assertThat(targetLogsDTO1).isNotEqualTo(targetLogsDTO2);
        targetLogsDTO2.setId(targetLogsDTO1.getId());
        assertThat(targetLogsDTO1).isEqualTo(targetLogsDTO2);
        targetLogsDTO2.setId(2L);
        assertThat(targetLogsDTO1).isNotEqualTo(targetLogsDTO2);
        targetLogsDTO1.setId(null);
        assertThat(targetLogsDTO1).isNotEqualTo(targetLogsDTO2);
    }
}
