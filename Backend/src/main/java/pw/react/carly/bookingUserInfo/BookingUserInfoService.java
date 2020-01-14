package pw.react.carly.bookingUserInfo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BookingUserInfoService {

    private BookingUserInfoRepository bookingUserInfoRepository;

    @Autowired
    public BookingUserInfoService(BookingUserInfoRepository bookingUserInfoRepository) {
        this.bookingUserInfoRepository = bookingUserInfoRepository;
    }

    public BookingUserInfo updateBookingUserInfo(BookingUserInfo bookingUserInfo){
        if(bookingUserInfoRepository.existsById(bookingUserInfo.getId())) {
            bookingUserInfoRepository.save(bookingUserInfo);
            return bookingUserInfoRepository.save(bookingUserInfo);
        }
        throw new ResourceNotFoundException("BookingUserInfo not found");
    }

    public BookingUserInfo deleteBookingUserInfo(BookingUserInfo bookingUserInfo){
        if(bookingUserInfoRepository.existsById(bookingUserInfo.getId())) {
            bookingUserInfoRepository.delete(bookingUserInfo);
            return bookingUserInfo;
        }
        throw new ResourceNotFoundException("BookingUserInfo not found");
    }

    public BookingUserInfo getBookingUserInfo(Long id){
        if(bookingUserInfoRepository.existsById(id)) {
            return bookingUserInfoRepository.findById(id).get();
        }
        throw new ResourceNotFoundException("BookingUserInfo not found");
    }
}
