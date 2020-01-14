package pw.react.carly.bookingUserInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingUserInfoRepository extends JpaRepository<BookingUserInfo, Long> {
	
	BookingUserInfo findByEmail(String email);
	
}