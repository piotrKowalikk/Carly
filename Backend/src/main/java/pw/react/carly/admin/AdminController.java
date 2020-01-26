package pw.react.carly.admin;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/admins")
public class AdminController {
    private AdminService adminService;
    private AdminRepository adminRepository;


    @Autowired
    public AdminController(AdminService adminService, AdminRepository adminRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.adminService = adminService;
        this.adminRepository = adminRepository;
        this.encoder = bCryptPasswordEncoder;
    }

    private BCryptPasswordEncoder encoder;
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(adminService.getAdmin(id));
    }
    @GetMapping("")
    public ResponseEntity<List<Admin>> getAdmins(
            @RequestParam(required = false,name="email") String email){
        List<Admin> admins;
        if(email!=null)
            admins = adminRepository.findAdminByEmail(email);
        else
            admins = adminRepository.findAll();
        return ResponseEntity.ok().body(admins);
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody Admin user) {
        user.setPassword(encoder.encode(user.getPassword()));
        adminRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAdmin(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(adminService.deleteAdmin(adminService.getAdmin((id))));
    }
    @PatchMapping("")
    public ResponseEntity<Admin> updateAdmin(@RequestBody @Valid Admin Admin){
        return ResponseEntity.ok().body(adminService.updateAdmin(Admin));
    }
    @PutMapping(path = "")
    public ResponseEntity<Admin> updateWholeAdmin(@RequestBody @Valid Admin updatedAdmin) {
        return ResponseEntity.ok().body(adminRepository.save(updatedAdmin));
    }

}
