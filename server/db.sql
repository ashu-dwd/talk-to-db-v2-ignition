-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 12, 2025 at 10:52 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_mngmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `appointment_date` datetime NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `patient_id`, `doctor_id`, `appointment_date`, `status`) VALUES
(1, 1, 1, '2025-01-16 10:30:00', 'Completed'),
(2, 2, 5, '2025-01-23 11:00:00', 'Completed'),
(3, 3, 2, '2025-02-04 09:15:00', 'Completed'),
(4, 4, 6, '2025-02-11 14:30:00', 'Completed'),
(5, 5, 13, '2025-02-18 16:00:00', 'Completed'),
(6, 6, 4, '2025-02-26 10:00:00', 'Completed'),
(7, 7, 11, '2025-03-04 11:30:00', 'Completed'),
(8, 8, 9, '2025-03-11 15:45:00', 'Completed'),
(9, 9, 12, '2025-03-16 09:00:00', 'Completed'),
(10, 10, 7, '2025-03-23 13:15:00', 'Completed'),
(11, 11, 3, '2025-03-30 10:30:00', 'Completed'),
(12, 12, 8, '2025-04-03 14:00:00', 'Scheduled'),
(13, 13, 10, '2025-04-07 11:45:00', 'Scheduled'),
(14, 14, 14, '2025-04-09 16:30:00', 'Scheduled'),
(15, 15, 15, '2025-04-12 09:30:00', 'Scheduled');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`) VALUES
(1, 'Cardiology'),
(2, 'Neurology'),
(3, 'Orthopedics'),
(4, 'Pediatrics'),
(5, 'Gynecology'),
(6, 'Dermatology'),
(7, 'Ophthalmology'),
(8, 'ENT'),
(9, 'Psychiatry'),
(10, 'Oncology'),
(11, 'Urology'),
(12, 'Pulmonology'),
(13, 'Gastroenterology'),
(14, 'Endocrinology'),
(15, 'General Surgery');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `specialization` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `name`, `specialization`, `department_id`, `contact`) VALUES
(1, 'Dr. Rajesh Sharma', 'Cardiologist', 1, '+91 98765 43210'),
(2, 'Dr. Priya Patel', 'Neurologist', 2, '+91 87654 32109'),
(3, 'Dr. Vikram Singh', 'Orthopedic Surgeon', 3, '+91 76543 21098'),
(4, 'Dr. Anjali Gupta', 'Pediatrician', 4, '+91 65432 10987'),
(5, 'Dr. Neha Verma', 'Gynecologist', 5, '+91 54321 09876'),
(6, 'Dr. Arun Kumar', 'Dermatologist', 6, '+91 43210 98765'),
(7, 'Dr. Sanjay Joshi', 'Ophthalmologist', 7, '+91 32109 87654'),
(8, 'Dr. Meena Iyer', 'ENT Specialist', 8, '+91 21098 76543'),
(9, 'Dr. Ashok Desai', 'Psychiatrist', 9, '+91 10987 65432'),
(10, 'Dr. Kavita Reddy', 'Oncologist', 10, '+91 09876 54321'),
(11, 'Dr. Srinivas Rao', 'Urologist', 11, '+91 98765 12345'),
(12, 'Dr. Rekha Menon', 'Pulmonologist', 12, '+91 87654 23456'),
(13, 'Dr. Amit Malhotra', 'Gastroenterologist', 13, '+91 76543 34567'),
(14, 'Dr. Deepa Nair', 'Endocrinologist', 14, '+91 65432 45678'),
(15, 'Dr. Vivek Agarwal', 'General Surgeon', 15, '+91 54321 56789');

-- --------------------------------------------------------

--
-- Table structure for table `insurance`
--

CREATE TABLE `insurance` (
  `insurance_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `provider` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `policy_number` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `coverage_amount` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `insurance`
--

INSERT INTO `insurance` (`insurance_id`, `patient_id`, `provider`, `policy_number`, `coverage_amount`) VALUES
(1, 1, 'LIC Health Insurance', 'LIC-H-789456', '500000.00'),
(2, 2, 'Star Health Insurance', 'STAR-987654', '300000.00'),
(3, 3, 'HDFC ERGO Health', 'ERGO-123789', '1000000.00'),
(4, 4, 'Apollo Munich Health', 'APOL-456123', '400000.00'),
(5, 5, 'Max Bupa Health', 'BUPA-789012', '750000.00'),
(6, 6, 'ICICI Lombard', 'ICICI-345678', '200000.00'),
(7, 7, 'Bajaj Allianz Health', 'BAJAJ-901234', '600000.00'),
(8, 8, 'New India Assurance', 'NIA-567890', '350000.00'),
(9, 9, 'Reliance Health Insurance', 'REL-123456', '500000.00'),
(10, 10, 'Oriental Insurance', 'ORI-789123', '250000.00'),
(11, 11, 'SBI Health Insurance', 'SBI-456789', '800000.00'),
(12, 12, 'National Insurance', 'NAT-012345', '450000.00'),
(13, 13, 'United India Insurance', 'UII-678901', '550000.00'),
(14, 14, 'Aditya Birla Health', 'BIRLA-234567', '600000.00'),
(15, 15, 'Tata AIG Health', 'TATA-890123', '700000.00');

-- --------------------------------------------------------

--
-- Table structure for table `lab_tests`
--

CREATE TABLE `lab_tests` (
  `test_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `test_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `result` text COLLATE utf8mb4_general_ci NOT NULL,
  `test_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lab_tests`
--

INSERT INTO `lab_tests` (`test_id`, `patient_id`, `test_name`, `result`, `test_date`) VALUES
(1, 1, 'Lipid Profile', 'Cholesterol: 220mg/dL, Triglycerides: 180mg/dL', '2025-01-17'),
(2, 2, 'Thyroid Function Test', 'TSH: 6.5 mIU/L, T4: 8.2 µg/dL', '2025-01-24'),
(3, 3, 'CT Scan Brain', 'Mild cerebral atrophy noted', '2025-02-05'),
(4, 4, 'Skin Biopsy', 'No malignant cells', '2025-02-12'),
(5, 5, 'Endoscopy', 'Gastritis observed, biopsy taken', '2025-02-19'),
(6, 6, 'Complete Blood Count', 'Hb: 10.2g/dL, WBC: 12,500/mm³', '2025-02-27'),
(7, 7, 'Urine Culture', 'E. coli detected, sensitive to ciprofloxacin', '2025-03-05'),
(8, 8, 'Psychological Assessment', 'Moderate anxiety disorder', '2025-03-12'),
(9, 9, 'Pulmonary Function Test', 'FEV1: 65% of predicted', '2025-03-17'),
(10, 10, 'Eye Refraction Test', 'Right: -2.5, Left: -2.25', '2025-03-24'),
(11, 11, 'X-Ray Knee', 'Mild osteoarthritis observed', '2025-03-31'),
(12, 12, 'Audiometry', 'Mild hearing loss at high frequencies', '2025-04-04'),
(13, 13, 'Mammography', 'No suspicious masses identified', '2025-04-07'),
(14, 14, 'Glucose Tolerance Test', 'Fasting: 110mg/dL, 2hr: 145mg/dL', '2025-04-09'),
(15, 15, 'Ultrasound Abdomen', 'Mild fatty infiltration of liver', '2025-04-11');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `medicine_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `manufacturer` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`medicine_id`, `name`, `manufacturer`, `price`, `stock`) VALUES
(1, 'Crocin', 'GSK Pharmaceuticals', '15.50', 500),
(2, 'Amoxicillin', 'Cipla', '85.75', 300),
(3, 'Azithromycin', 'Sun Pharma', '120.00', 250),
(4, 'Pantoprazole', 'Dr. Reddy\'s', '42.30', 400),
(5, 'Metformin', 'Lupin', '38.60', 450),
(6, 'Atorvastatin', 'Mankind Pharma', '95.20', 320),
(7, 'Ramipril', 'Zydus Cadila', '75.50', 280),
(8, 'Diazepam', 'Alkem Laboratories', '45.00', 150),
(9, 'Cetirizine', 'Intas Pharmaceuticals', '25.30', 600),
(10, 'Paracetamol', 'Micro Labs', '12.75', 800),
(11, 'Ibuprofen', 'Alembic Pharmaceuticals', '18.90', 700),
(12, 'Omeprazole', 'Torrent Pharmaceuticals', '35.80', 350),
(13, 'Levothyroxine', 'Biocon', '120.50', 200),
(14, 'Amlodipine', 'Glenmark', '30.40', 420),
(15, 'Aspirin', 'Wockhardt', '8.25', 900);

-- --------------------------------------------------------

--
-- Table structure for table `nurses`
--

CREATE TABLE `nurses` (
  `nurse_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nurses`
--

INSERT INTO `nurses` (`nurse_id`, `name`, `department_id`, `contact`) VALUES
(1, 'Asha Singh', 1, '+91 98712 34567'),
(2, 'Preeti Verma', 2, '+91 87612 34567'),
(3, 'Raj Kapoor', 3, '+91 76512 34567'),
(4, 'Suman Gupta', 4, '+91 65412 34567'),
(5, 'Kavita Rani', 5, '+91 54312 34567'),
(6, 'Manoj Kumar', 6, '+91 43212 34567'),
(7, 'Geeta Sharma', 7, '+91 32112 34567'),
(8, 'Prakash Joshi', 8, '+91 21112 34567'),
(9, 'Neelam Saxena', 9, '+91 11112 34567'),
(10, 'Rajesh Varma', 10, '+91 98711 34567'),
(11, 'Sunita Mehta', 11, '+91 98722 34567'),
(12, 'Vinod Sharma', 12, '+91 98733 34567'),
(13, 'Maya Patel', 13, '+91 98744 34567'),
(14, 'Rohit Khanna', 14, '+91 98755 34567'),
(15, 'Priyanka Das', 15, '+91 98766 34567');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `admitted_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `name`, `age`, `gender`, `contact`, `admitted_date`) VALUES
(1, 'Ravi Goel', 42, 'Male', '+91 89012 34567', '2025-01-15'),
(2, 'Sunita Khanna', 35, 'Female', '+91 78901 23456', '2025-01-22'),
(3, 'Mohan Das', 67, 'Male', '+91 67890 12345', '2025-02-03'),
(4, 'Anita Mishra', 28, 'Female', '+91 56789 01234', '2025-02-10'),
(5, 'Deepak Chopra', 51, 'Male', '+91 45678 90123', '2025-02-17'),
(6, 'Pooja Sharma', 32, 'Female', '+91 34567 89012', '2025-02-25'),
(7, 'Rahul Mehta', 45, 'Male', '+91 23456 78901', '2025-03-03'),
(8, 'Sarika Jain', 39, 'Female', '+91 12345 67890', '2025-03-10'),
(9, 'Anil Kumar', 58, 'Male', '+91 01234 56789', '2025-03-15'),
(10, 'Meera Trivedi', 29, 'Female', '+91 90123 45678', '2025-03-22'),
(11, 'Rakesh Singh', 62, 'Male', '+91 89123 45678', '2025-03-28'),
(12, 'Lalita Prasad', 47, 'Female', '+91 78912 34567', '2025-04-02'),
(13, 'Vijay Thakur', 55, 'Male', '+91 67891 23456', '2025-04-05'),
(14, 'Nita Patel', 36, 'Female', '+91 56781 23456', '2025-04-08'),
(15, 'Karan Malhotra', 41, 'Male', '+91 45671 23456', '2025-04-10');

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `prescription_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `medicine_id` int NOT NULL,
  `dosage` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `days` int NOT NULL,
  `appointment_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`prescription_id`, `patient_id`, `doctor_id`, `medicine_id`, `dosage`, `days`, `appointment_id`) VALUES
(1, 1, 1, 6, '10mg once daily', 30, NULL),
(2, 2, 5, 13, '50mcg once daily', 90, NULL),
(3, 3, 2, 8, '5mg twice daily', 15, NULL),
(4, 4, 6, 9, '10mg once daily', 7, NULL),
(5, 5, 13, 12, '20mg before breakfast', 14, NULL),
(6, 6, 4, 10, '500mg thrice daily', 5, NULL),
(7, 7, 11, 7, '5mg once daily', 30, NULL),
(8, 8, 9, 8, '2mg at bedtime', 30, NULL),
(9, 9, 12, 3, '500mg once daily', 3, NULL),
(10, 10, 7, 10, '650mg as needed', 7, NULL),
(11, 11, 3, 11, '400mg thrice daily', 5, NULL),
(12, 12, 8, 9, '5mg once daily', 10, NULL),
(13, 13, 10, 5, '500mg twice daily', 60, NULL),
(14, 14, 14, 14, '5mg once daily', 30, NULL),
(15, 15, 15, 2, '500mg thrice daily', 7, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int NOT NULL,
  `room_type` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `availability` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_type`, `availability`) VALUES
(101, 'General Ward', 'Available'),
(102, 'General Ward', 'Occupied'),
(103, 'General Ward', 'Available'),
(201, 'Semi-Private', 'Occupied'),
(202, 'Semi-Private', 'Available'),
(203, 'Semi-Private', 'Occupied'),
(301, 'Private', 'Available'),
(302, 'Private', 'Occupied'),
(303, 'Private', 'Available'),
(401, 'ICU', 'Occupied'),
(402, 'ICU', 'Occupied'),
(403, 'ICU', 'Available'),
(501, 'Operation Theater', 'Available'),
(502, 'Operation Theater', 'Occupied'),
(601, 'Emergency', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `contact` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `name`, `role`, `contact`) VALUES
(1, 'Ramesh Prasad', 'Administrator', '+91 97865 43210'),
(2, 'Seema Agarwal', 'Receptionist', '+91 86754 32109'),
(3, 'Kunal Bhatia', 'Pharmacist', '+91 75643 21098'),
(4, 'Lata Deshmukh', 'Lab Technician', '+91 64532 10987'),
(5, 'Prakash Yadav', 'Security Guard', '+91 53421 09876'),
(6, 'Nisha Bajaj', 'Dietician', '+91 42310 98765'),
(7, 'Rajiv Choudhary', 'Accountant', '+91 31209 87654'),
(8, 'Archana Kulkarni', 'HR Manager', '+91 20198 76543'),
(9, 'Sanjay Vyas', 'Maintenance', '+91 19087 65432'),
(10, 'Ritu Singhania', 'Social Worker', '+91 98076 54321'),
(11, 'Manoj Tiwari', 'Ambulance Driver', '+91 97865 12345'),
(12, 'Shweta Rao', 'Physiotherapist', '+91 86754 23456'),
(13, 'Dinesh Jain', 'Radiology Technician', '+91 75643 34567'),
(14, 'Mala Singh', 'Cleaner', '+91 64532 45678'),
(15, 'Ajay Mathur', 'IT Support', '+91 53421 56789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `appointments_ibfk_1` (`patient_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `insurance`
--
ALTER TABLE `insurance`
  ADD PRIMARY KEY (`insurance_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `lab_tests`
--
ALTER TABLE `lab_tests`
  ADD PRIMARY KEY (`test_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`medicine_id`);

--
-- Indexes for table `nurses`
--
ALTER TABLE `nurses`
  ADD PRIMARY KEY (`nurse_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`prescription_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `fk_prescription_appointment` (`appointment_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `insurance`
--
ALTER TABLE `insurance`
  ADD CONSTRAINT `insurance_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`);

--
-- Constraints for table `lab_tests`
--
ALTER TABLE `lab_tests`
  ADD CONSTRAINT `lab_tests_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`);

--
-- Constraints for table `nurses`
--
ALTER TABLE `nurses`
  ADD CONSTRAINT `nurses_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `fk_prescription_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`),
  ADD CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  ADD CONSTRAINT `prescriptions_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`),
  ADD CONSTRAINT `prescriptions_ibfk_3` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
