package tr.com.khg.targettracer.repository;

import tr.com.khg.targettracer.domain.TargetLogs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TargetLogs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TargetLogsRepository extends JpaRepository<TargetLogs, Long> {

}
