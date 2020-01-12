package tr.com.khg.targettracer.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import tr.com.khg.targettracer.web.rest.TestUtil;

public class TargetLogsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TargetLogs.class);
        TargetLogs targetLogs1 = new TargetLogs();
        targetLogs1.setId(1L);
        TargetLogs targetLogs2 = new TargetLogs();
        targetLogs2.setId(targetLogs1.getId());
        assertThat(targetLogs1).isEqualTo(targetLogs2);
        targetLogs2.setId(2L);
        assertThat(targetLogs1).isNotEqualTo(targetLogs2);
        targetLogs1.setId(null);
        assertThat(targetLogs1).isNotEqualTo(targetLogs2);
    }
}
