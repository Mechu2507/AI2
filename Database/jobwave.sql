
create database if not exists jobwave;

use jobwave;

create table roles (
    id int not null auto_increment,
    role varchar(30) not null,
    primary key (id)
);

create table users (
	id int not null auto_increment,
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    role_id int,
    telephone varchar(50) not null,
    email text not null,
    password text not null,
    education varchar(100) null, 
    experience varchar(500) null,
    interests varchar(100) null,
    skills varchar(300) null,
    languages varchar(100) null,
    portfolio varchar(500) null,
    successes varchar(400) null,
    expected_salary float null,
    expected_job varchar(50) null,
    photo varchar(200) null,
    company_name varchar(50) null,
    company_address varchar(50) null,
    primary key (id),
    foreign key (role_id) references roles(id)
);

create table statuses (
    id int not null auto_increment,
    status varchar(30) not null,
    primary key (id)
);

create table invitations (
    id int not null auto_increment,
    employees_user_id int,
    employers_user_id int,
    status_id int,
    call_date date not null,
    
    primary key (id),
    foreign key (employees_user_id) references users(id),
    foreign key (employers_user_id) references users(id),
    foreign key (status_id) references statuses(id)
);

create table saves(
    id int not null auto_increment,
    employees_user_id int,
    employers_user_id int,

    primary key (id),
    foreign key (employees_user_id) references users(id),
    foreign key (employers_user_id) references users(id)
);

insert into roles (role) values ('Pracownik'), ('Pracodawca');

insert into statuses (status) values ('Nowe'), ('Odbyte'), ('Anulowane');

INSERT INTO `users` (`id`, `firstname`, `lastname`, `role_id`, `telephone`, `email`, `password`, `education`, `experience`, `interests`, `skills`, `languages`, `portfolio`, `successes`, `expected_salary`, `expected_job`, `photo`, `company_name`, `company_address`) VALUES
(2, 'Jan', 'Kowalski', 1, '1234567890', 'jan@email.com', '$2a$10$cDwXyvlpkqztuaAuk1hcoehnvowZsoDnU.mHtsHwKn8co70do4vJ6', 'Uniwersytet', '3 lata pracy jako kelner w restauracji ZGara', 'Muzyka Sport Gotowanie', 'Radzenie sobie w stresującej sytuacji', 'Polski Angielski Niemiecki', '-', 'null', 4500, 'Kelner', 'https://www.sklep.spart.com.pl/uploads/blog/main/5ec696df7cee2-AdobeStock-259736691-1-.jpeg', NULL, NULL),
(3, 'Dariusz', 'Nowak', 1, '1234567890', 'Dariusz@email.com', '$2a$10$hKfh9XQsDc9jtmqm.41MS.Y8zpGDObGAAKslD6JQwROhC8WtLBMiO', 'Liceum humanistyczne', '2 lata pracy jako kasjer w restauracji McDonald\'s', 'Muzyka Sport Finanse', 'Obsługa kasy', 'Polski Angielski Niemiecki Hiszpański Francuski', '---', '3-krotny pracownik miesiąca', 4000, 'Kasjer', 'https://i.imgur.com/iw4WOGm.png', NULL, NULL),
(4, 'Karol', 'Paryski', 2, '1234567890', 'Karol@email.com', '$2a$10$2S2l6oL7VUfR054xK3MuPOdvqdDhsr1bf66ASaGArDIuciArXb54a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Frutello', 'Szybka 12, Rzeszów'),
(5, 'Mateusz', 'Kamyk', 1, '1234567890', 'Mateusz@email.com', '$2a$10$3Rv2TJRNTyWDTpPqNDGszu7sS7RVNYLAdlxVPe8QqLhgE3jt6VtTi', 'Uniwersytet', '1,5 roku pracy w biurze rachunkowym', 'Muzyka Sport Finanse Podróże', 'Obsługa kasy, prowadzenie rachunkowości', 'Polski Angielski', '--', 'null', 8500, 'Księgowy', 'https://i.imgur.com/3fNLxQa.png', NULL, NULL),
(6, 'Kazimierz', 'Mazur', 1, '1234567890', 'Kazimierz@email.com', '$2a$10$pI3EmyOPyf8LYO6fYk3meuaysWAPLIIeh4EBaQr90QUNB3wzeG4b.', 'Politechnika', '2 lata pracy jako programista w firmie IveloEnergy', 'Programowanie Sport Muzyka Gry', 'Wysokie umiejętności frontendowe', 'Polski Angielski', 'Github.com', 'Wygrany konkurs XYZ', 12000, 'Programista', 'https://i.imgur.com/cUUWWx7.png', NULL, NULL),
(7, 'Karolina', 'Niepoważna', 1, '1234567890', 'Karolina@email.com', '$2a$10$G8zSkDuBeVWVStzFpoZcj.RCQb2vUBViFgEa.E6GZ4n82cY/tR9b6', 'Technikum budowlane', '1,5 roku pracy jako operator wózka widłowego w firmie VegieFresh', 'Sport Muzyka Podróże', 'Kurs wózka widłowego', 'Polski', '---', '2-krotny pracownik miesiąca', 7000, 'Operator wózka widłowego', 'https://i.imgur.com/qJra7bc.png', NULL, NULL),
(8, 'Magda', 'Mrozek', 1, '1234567890', 'Magda@email.com', '$2a$10$eIEiXJQqCjZ2Rz89/B/P0.kSiGKp90Mj/3iwqk88UVzI3JGfIcpk6', 'Uniwersytet Rzeszowski', '4 lata pracy jako matematyk w szkole Podstawowej', 'Całki Muzyka Sport', '---', 'Polski Angielski', '---', '---', 5000, 'Matematyk', 'https://i.imgur.com/agZfh9K.png', NULL, NULL),
(9, 'Jakub', 'Prawy', 2, '1234567890', 'Jakub@email.com', '$2a$10$VINcEAjIASYjeo/fq0zYGuoyHzELcFW9U3UptyaibdwqYivxHp2Mq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Kamil', 'Lewy', 1, '1234567890', 'Kamil@email.com', '$2a$10$t7ktCSiMWzBLFzLU1Wm54.nij9QyASAmJpQ1ASogQlNeokuo0B5oa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Kamila', 'Nowicka', 1, '1234567890', 'Kamila@email.com', '$2a$10$mHq1srZZsnbeQPBNFf/f/.SUvIPTG8lesWKc.t8uAA0NvHMO1vna2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Paulina', 'Widelec', 1, '1234567890', 'Paulina@email.com', '$2a$10$NRUuoxo8Z64Y90C8/znPFuLDxhY/plzIBY1EJDO.v5wSCkwTfKlsi', 'Szkoła', NULL, 'Muzyka', NULL, 'Polski', NULL, NULL, 4000, 'Kasjer', NULL, NULL, NULL);

INSERT INTO `saves` (`id`, `employees_user_id`, `employers_user_id`) VALUES
(1, 2, 4),
(4, 5, 4),
(5, 10, 4);

INSERT INTO `invitations` (`id`, `employees_user_id`, `employers_user_id`, `status_id`, `call_date`) VALUES
(1, 2, 4, 1, '2024-02-01'),
(2, 12, 4, 3, '2024-02-02'),
(3, 3, 4, 1, '2024-03-01');