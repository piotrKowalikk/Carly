
--Add initial admins
INSERT INTO public.admins(
    id, email, password)
VALUES (1001,'email@email','plain-text-password');

INSERT INTO public.admins(
    id, email, password)
VALUES (1002,'email2@email','plain-text-password');

INSERT INTO public.admins(
    id,email, password)
VALUES (1003,'email3@email','plain-text-password');

INSERT INTO public.admins(
    id,email, password)
VALUES (1004,'email4@email','plain-text-password');


-- Add inital cars
INSERT INTO public.cars(
    id,doors, engine, licence, location, model, seats, year)
VALUES (1001,3, 'Silniczek1', 'WK2645', 'Warszawa, Al.Jerezolimskie 34','Autko Fajne' , 4, 2017);

INSERT INTO public.cars(
    id,doors, engine, licence, location, model, seats, year)
VALUES ( 1002,5, 'Silniczek2', 'WK2645', 'Warszawa, Al.Jerezolimskie 35','Autko Fajne2' , 5, 2014);

INSERT INTO public.cars(
    id,doors, engine, licence, location, model, seats, year)
VALUES (1003, 4, 'Silniczek3', 'WK2645', 'Lublin, Al.Jerezolimskie 36','Autko Fajne3' , 5, 2016);

INSERT INTO public.cars(
    id,doors, engine, licence, location, model, seats, year)
VALUES ( 1004,2, 'Silniczek4', 'WK2645', 'Radom, Al.Jerezolimskie 37','Autko Fajne4' , 2, 2015);


-- Add initial BookingUserInfos
INSERT INTO public.booking_user_infos(
    id,email, name, surname)
VALUES (1000,'booking@mail.com', 'Jan', 'Kowalski');

INSERT INTO public.booking_user_infos(
    id,email, name, surname)
VALUES (1001,'booking2@mail.com', 'Arek', 'Nowak');

INSERT INTO public.booking_user_infos(
    id,email, name, surname)
VALUES (1002,'booking3@mail.com', 'Adrian', 'Jaszczomp');


-- Add initial statuses
INSERT INTO public.status(
    id, comment, date_from, date_to, type, booking_user_info_id, car_id)
VALUES (1001, 'Normalna rezerwacja', '2020-01-17','2020-01-24','BOOKED', 1001, 1001);

INSERT INTO public.status(
    id, comment, date_from, date_to, type, booking_user_info_id, car_id)
VALUES (1002, 'Anulowana rezerwacja', '2020-01-23','2020-01-25','BOOKINGCANCELED', 1002, 1002);

INSERT INTO public.status(
    id, comment, date_from, date_to, type, booking_user_info_id, car_id)
VALUES (1003, 'Auto niedostepne', '2020-01-25','2020-01-28','UNAVAILABLE', 1000, 1003);