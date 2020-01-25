

//SECURITY

POST: /admins/sign-up
    -body {email,password}
POST /login
    -body {email,password}

w headerze odpowiedzi jest token  do autentykacji, ktory trzeba podpiac pod requesty w formie headera Authorization

//API
-post,update,delete nic ciekawego
-get
    -cars
        -parametry
            -from & to - data do wyszukiwania aut dostepnych/niedostepnych w danym przedziale czasu (muszą się pojawić oba na raz, inaczej zwroci bad request)
            -filtrowanie po polach auta
            -available - boolean okresla czy chcemy dostac auta dostepne/niedostepne w danym przedziale czasu (w domysle true) ignorowany kiedy nie podalismy dat!!!!!