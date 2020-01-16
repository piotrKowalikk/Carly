package pw.react.carly.admin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AdminRepository extends JpaRepository<Admin,Long> {
    List<Admin> findAdminByEmail(String email);
}
