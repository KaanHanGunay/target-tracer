package tr.com.khg.targettracer.repository;

import tr.com.khg.targettracer.domain.Target;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Target entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TargetRepository extends JpaRepository<Target, Long> {

    @Query("select target from Target target where target.user.login = ?#{principal.username}")
    List<Target> findByUserIsCurrentUser();

}
