package pw.react.carly.admin;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class AdminService {

    private AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin updateAdmin(Admin admin){
        if(adminRepository.existsById(admin.getId())) {
            adminRepository.save(admin);
            return adminRepository.save(admin);
        }
        throw new ResourceNotFoundException("Admin not found");
    }

    public Admin deleteAdmin(Admin admin){
        if(adminRepository.existsById(admin.getId())) {
            adminRepository.delete(admin);
            return admin;
        }
        throw new ResourceNotFoundException("Admin not found");
    }

    public Admin getAdmin(Long id){
        if(adminRepository.existsById(id)) {
            return adminRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("Admin not found");
    }
}
