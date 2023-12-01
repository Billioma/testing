import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const {
  // CUSTOMER ROUTES
  CUST_LOGIN,
  CUST_LOGIN_REDIRECT,
  CUST_SIGNUP,
  CUST_RESET_PASS,
  CUST_RESET_SENT,
  CUST_CHANGE_PASS,
  CUST_PARK,
  CUST_SCAN_PARK,
  CUST_CHANGE_SUCCESS,

  // CLIENT ROUTES
  CLIENT_LOGIN,
  CLIENT_RESET_PASS,
  CLIENT_RESET_SENT,
  CLIENT_CHANGE_PASS,
  CLIENT_CHANGE_SUCCESS,

  // OPERATOR ROUTES
  OP_LOGIN,
  OPERATOR_RESET_PASSWORD,
  OPERATOR_RESET_SENT,
  OPERATOR_CHANGE_PASS,
  OPERATOR_CHANGE_SUCCESS,

  // ADMIN routes
  ADMIN_RESET_PASSWORD_LINK,
  ADMIN_RESET_PASSWORD,
  ADMIN_LOGIN,
} = PUBLIC_PATHS;

const {
  // CUSTOMER ROUTES
  CUST_DASHBOARD,
  CUST_SERVICES_PARK,
  CUST_SERVICE_PARK_DETAILS,
  CUST_HISTORY_PARK_DETAILS,
  CUST_HISTORY_USER,
  CUST_HISTORY_US,
  CUST_SERVICES_CAR_SERVICE_DETAILS,
  CUST_SERVICES_RESERVE_PARK,
  CUST_SERVICES_RESERVE_PARK_DETAILS,
  CUST_HISTORY_RESERVE_PARK_DETAILS,
  CUST_SERVICES_EVENT_PARK,
  CUST_SERVICES_EVENT_PARK_DETAILS,
  CUST_HISTORY_EVENT_PARK_DETAILS,
  CUST_SERVICE_VALET_DETAILS,
  CUST_SUBSCRIPTION,
  CUST_ADD_SUBSCRIPTION,
  CUST_VEHICLES,
  CUST_HELP_CENTER,
  CUST_HELP_CENTER_MAIL,
  CUST_HELP_CENTER_FAQ,
  CUST_SETTINGS,
  CUST_SERVICES_CAR_SERVICE,
  CUST_PAYMENT,
  CUST_PROFILE,
  CUST_EDIT_PROFILE,

  // CLIENt ROUTES
  CLIENT_DASHBOARD,
  CLIENT_USERS,
  CLIENT_ADD_USER,
  CLIENT_EVENTS,
  CLIENT_LOGS,
  CLIENT_TRAN,
  CLIENT_LOGS_VALET,
  CLIENT_LOGS_DETAILS,
  CLIENT_LOGS_VALET_DETAILS,
  CLIENT_TRAN_DETAILS,
  CLIENT_ADD_EVENT,
  CLIENT_EDIT_EVENT,
  CLIENT_ADD_SUB,
  CLIENT_VIEW_SUB,
  CLIENT_PROFILE,

  // OPERATOR ROUTES
  OP_DASHBOARD,
  OP_ADD_ATTENDANT,
  OP_ATTENDANT,
  OP_ATTENDANT_DETAILS,
  OP_LOCATIONS,
  OP_ADD_LOCATION,
  OP_LOCATION_DETAILS,
  OP_POLICIES,
  OP_POLICY_DETAILS,
  OP_RATES,
  OP_ZONES,
  OP_ZONE_DETAILS,
  OP_ADD_ZONE,
  OP_ADD_POLICY,
  OP_VALETED,
  OP_TRANSACTION,
  OP_TRANSACTION_DETAILS,
  OP_VALETED_DETAILS,
  OP_PARKED,
  OP_PARKED_DETAILS,
  OP_SERVICED,
  OP_SERVICED_DETAILS,
  OP_REP_PAYMENTS,
  OP_REP_LOCATIONS,
  OP_REP_ZONES,
  OP_REP_LOGS,
  OP_RATE_DETAILS,
  OP_ADD_RATE,
  OP_PROFILE,
  OP_PTP_TRANSACTION,
  OP_PTP_TRANSACTION_DETAILS,
  OP_RP_TRANSACTION,
  OP_RP_TRANSACTION_DETAILS,
  OP_EV_TRANSACTION,
  OP_EV_TRANSACTION_DETAILS,
  OP_SERVICE_TRANSACTION,
  OP_SERVICE_TRANSACTION_DETAILS,

  ADMIN_CUSTOMERS,
  ADMIN_DASHBOARD,
  ADMIN_SERVICES,
  ADMIN_ATTENDANTS,
  ADMIN_ADD_ATTENDANT,
  ADMIN_VIEW_ATTENDANT,
  ADMIN_ADD_CUSTOMER,
  ADMIN_VIEW_CUSTOMER,
  ADMIN_ADMINISTRATORS,
  ADMIN_ADD_ADMINISTRATOR,
  ADMIN_VIEW_ADMINISTRATOR,
  ADMIN_OPERATORS,
  ADMIN_ADD_OPERATOR,
  ADMIN_VIEW_OPERATOR,
  ADMIN_ADD_VEHICLE,
  ADMIN_VEHICLES,
  ADMIN_VIEW_VEHICLE,
  ADMIN_PROFILE,
  ADMIN_EDIT_PROFILE,

  ADMIN_MEMBERSHIP_PLANS,
  ADMIN_ADD_MEMBERSHIP_PLAN,
  ADMIN_VIEW_MEMBERSHIP_PLAN,

  ADMIN_MEMBERSHIP_FEATURES,
  ADMIN_VIEW_MEMBERSHIP_FEATURE,
  ADMIN_ADD_MEMBERSHIP_FEATURE,

  ADMIN_CORPORATE_SUBSCRIPTIONS,
  ADMIN_VIEW_CORPORATE_SUBSCRIPTION,
  ADMIN_ADD_CORPORATE_SUBSCRIPTION,

  ADMIN_CUSTOMER_SUBSCRIPTIONS,
  ADMIN_ADD_CUSTOMER_SUBSCRIPTION,
  ADMIN_VIEW_CUSTOMER_SUBSCRIPTION,
  ADMIN_PAYTOPARK,
  ADMIN_VIEW_PAYTOPARK,
  ADMIN_RESERVED_PARKING,
  ADMIN_VIEW_RESERVED_PARKING,
  ADMIN_EVENTPARK,
  ADMIN_TIPS,
  ADMIN_VIEWTIPS,
  ADMIN_VIEW_EVENTPARK,
  ADMIN_ADD_RESERVED_PARKING,
  ADMIN_CAR_SERVICES,
  ADMIN_ADD_CAR_SERVICE,
  ADMIN_VIEW_CAR_SERVICE,
  ADMIN_CLIENTS,
  ADMIN_ADD_CLIENT,
  ADMIN_VIEW_CLIENT,
} = PRIVATE_PATHS;

//CUSTOMER PAGES
const CustLogin = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/Login"))
);

const CustResetPassword = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ResetPassword"))
);

const CustResetSent = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ResetSent"))
);

const CustChangePassword = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ChangePassword"))
);
const CustChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ChangeSuccess"))
);

const CustScan = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ScanPark"))
);
const CustPark = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/PayToPark"))
);
const CustSignup = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/Signup"))
);
const CustSettings = WithSuspense(
  lazy(() => import("../pages/Customer/Account/Settings"))
);
const CustProfile = WithSuspense(
  lazy(() => import("../pages/Customer/Account/Profile"))
);
const CustPayment = WithSuspense(
  lazy(() => import("../pages/Customer/Account/Payment"))
);
const CustEditProfile = WithSuspense(
  lazy(() => import("../pages/Customer/Account/EditProfile"))
);

const CustDashboard = WithSuspense(
  lazy(() => import("../pages/Customer/Dashboard/Dashboard"))
);

const CustServicesPark = WithSuspense(
  lazy(() => import("../pages/Customer/Services/Park"))
);

const CustServicesParkDetails = WithSuspense(
  lazy(() =>
    import("../components/data/Customer/History/User/PaytoParkDetails")
  )
);

const CustCompanyParkDetails = WithSuspense(
  lazy(() => import("../components/data/Customer/History/Us/PaytoParkDetails"))
);
const CustUsValetParking = WithSuspense(
  lazy(() =>
    import("../components/data/Customer/History/Us/ValetServiceDetails")
  )
);
const CustServicesReserveParkDetails = WithSuspense(
  lazy(() =>
    import("../components/data/Customer/History/User/ReserveParkingDetails")
  )
);
const CustUsReserveParkDetails = WithSuspense(
  lazy(() =>
    import("../components/data/Customer/History/Us/ReserveParkingDetails")
  )
);
const CustServicesCarServiceDetails = WithSuspense(
  lazy(() => import("../components/data/Customer/History/Us/CarServiceDetails"))
);
const CustServicesEventParkDetails = WithSuspense(
  lazy(() =>
    import("../components/data/Customer/History/User/EventParkingDetails")
  )
);
const CustUsEventParkDetails = WithSuspense(
  lazy(() =>
    import("../components/data/Customer/History/Us/EventParkingDetails")
  )
);
const CustServicesCar = WithSuspense(
  lazy(() => import("../pages/Customer/Services/CarServices"))
);
const CustServicesReservePark = WithSuspense(
  lazy(() => import("../pages/Customer/Services/ReserveParking"))
);
const CustServicesEventPark = WithSuspense(
  lazy(() => import("../pages/Customer/Services/EventParking"))
);
const CustHelp = WithSuspense(
  lazy(() => import("../pages/Customer/Help/Help"))
);
const CustFaq = WithSuspense(lazy(() => import("../pages/Customer/Help/Faq")));
const CustMail = WithSuspense(
  lazy(() => import("../pages/Customer/Help/ContactUs"))
);
const CustHistoryUs = WithSuspense(
  lazy(() => import("../pages/Customer/History/Us"))
);
const CustHistoryUser = WithSuspense(
  lazy(() => import("../pages/Customer/History/User"))
);
const CustSubscriptions = WithSuspense(
  lazy(() => import("../pages/Customer/Subscriptions/Subscriptions"))
);
const CustAddSubscriptions = WithSuspense(
  lazy(() => import("../pages/Customer/Subscriptions/AddSubscription"))
);
const CustVehicles = WithSuspense(
  lazy(() => import("../pages/Customer/Vehicles/Vehicles"))
);

//CUSTOMER PAGES
const ClientLogin = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/Login"))
);

const ClientResetPassword = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ResetPassword"))
);

const ClientResetSent = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ResetSent"))
);

const ClientChangePassword = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ChangePassword"))
);
const ClientChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ChangeSuccess"))
);
const ClientProfile = WithSuspense(
  lazy(() => import("../pages/Client/Account/Profile"))
);
const ClientDashboard = WithSuspense(
  lazy(() => import("../pages/Client/Dashboard/Dashboard"))
);
const ClientAddSub = WithSuspense(
  lazy(() => import("../pages/Client/Subscriptions/AddSub"))
);
const ClientViewSub = WithSuspense(
  lazy(() => import("../pages/Client/Subscriptions/Subscriptions"))
);
const ClientEvents = WithSuspense(
  lazy(() => import("../pages/Client/Events/Events"))
);
const ClientLogs = WithSuspense(
  lazy(() => import("../pages/Client/Logs/Logs"))
);
const ClientLogsValet = WithSuspense(
  lazy(() => import("../pages/Client/Logs/Valet"))
);
const ClientLogsDetails = WithSuspense(
  lazy(() => import("../pages/Client/Logs/ParkDetails"))
);

const ClientLogsValetDetails = WithSuspense(
  lazy(() => import("../pages/Client/Logs/ValetDetails"))
);
const ClientTran = WithSuspense(
  lazy(() => import("../pages/Client/Transactions/Transactions"))
);
const ClientTranDetails = WithSuspense(
  lazy(() => import("../pages/Client/Transactions/TransactionDetails"))
);
const ClientAddEvent = WithSuspense(
  lazy(() => import("../pages/Client/Events/AddEvent"))
);
const ClientEditEvent = WithSuspense(
  lazy(() => import("../pages/Client/Events/EditEvent"))
);
const ClientAddUser = WithSuspense(
  lazy(() => import("../pages/Client/Users/AddUser"))
);
const ClientUsers = WithSuspense(
  lazy(() => import("../pages/Client/Users/Users"))
);

//OPERATOR PAGES
const OperatorLogin = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/Login"))
);
const OperatorResetPassword = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ResetPassword"))
);
const OperatorResetSent = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ResetSent"))
);

const OperatorChangePassword = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ChangePassword"))
);
const OperatorChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ChangeSuccess"))
);
const OpDashboard = WithSuspense(
  lazy(() => import("../pages/Operator/Dashboard/Dashboard"))
);
const OpAttendant = WithSuspense(
  lazy(() => import("../pages/Operator/Users/Attendants"))
);
const OpAddAttendant = WithSuspense(
  lazy(() => import("../pages/Operator/Users/AddAttendant"))
);
const OpAttendantDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Users/AttendantDetails"))
);
const OpLocation = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Locations/Locations"))
);
const OpLocationDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Locations/LocationDetails"))
);
const OpAddLocation = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Locations/AddLocation"))
);
const OpZone = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Zones/Zones"))
);
const OpTransactions = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/Transactions"))
);
const OpTransactionDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/TransactionDetails"))
);
const OpPtpTransactions = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/PayToPark"))
);
const OpPtpTransactionDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/ViewPayToPark"))
);
const OpRpTransactions = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/ReserveParking"))
);
const OpRpTransactionDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/ViewReserveParking"))
);
const OpEvTransactions = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/EventParking"))
);
const OpEvTransactionDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/ViewEventParking"))
);
const OpServiceTransactions = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/ServiceBooking"))
);
const OpServiceTransactionDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Transactions/ViewServiceBookings"))
);
const OpZoneDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Zones/ZoneDetails"))
);
const OpAddZone = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Zones/AddZone"))
);
const OpRate = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Rates/Rates"))
);
const OpRateDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Rates/RateDetails"))
);
const OpAddRate = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Rates/AddRate"))
);
const OpPolicies = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Policies/Policies"))
);
const OpAddPolicy = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Policies/AddPolicy"))
);
const OpPolicyDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Policies/PolicyDetails"))
);
const OpValeted = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Valet/Vehicles"))
);
const OpValetedDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Valet/Details"))
);
const OpParked = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Parked/Vehicles"))
);
const OpParkedDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Parked/Details"))
);
const OpServiced = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Serviced/Vehicles"))
);
const OpServicedDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Serviced/Details"))
);
const OpRepPayment = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Payment"))
);
const OpRepLocation = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Locations"))
);
const OpRepZone = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Zones"))
);
const OpRepLog = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Logs"))
);
const OpProfile = WithSuspense(
  lazy(() => import("../pages/Operator/Account/Profile"))
);

// ADMIN PAGES
const AdminDashboard = WithSuspense(
  lazy(() => import("../pages/Admin/Dashboard/Dashboard"))
);

const AdminLogin = WithSuspense(
  lazy(() => import("../pages/Admin/Auth/Login"))
);

const AdminResetPassword = WithSuspense(
  lazy(() => import("../pages/Admin/Auth/ResetPassword"))
);

const AdminResetPasswordLink = WithSuspense(
  lazy(() => import("../pages/Admin/Auth/ResetPasswordLinkConfirmation"))
);

const AdminServices = WithSuspense(
  lazy(() => import("../pages/Admin/Services/Services"))
);

const AdminAttendants = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Attendants"))
);

const AdminCustomers = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Customers"))
);

const AdminAddAttendant = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddAttendant"))
);

const AdminProfile = WithSuspense(
  lazy(() => import("../pages/Admin/Profile/Profile"))
);

const AdminUpdateProfile = WithSuspense(
  lazy(() => import("../pages/Admin/Profile/EditProfile"))
);

const AdminViewAttendant = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewAttendant"))
);

const AdminAddCustomer = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddCustomer"))
);

const AdminViewCustomer = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewCustomer"))
);

const AdminOperators = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Operators"))
);

const AdminAddOperator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddOperator"))
);

const AdminViewOperator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewOperator"))
);

const AdminAdministrators = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Administrators"))
);

const AdminAddAdministrator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddAdministrator"))
);

const AdminViewAdministrator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewAdministrator"))
);

const AdminVehicles = WithSuspense(
  lazy(() => import("../pages/Admin/Vehicles/Vehicles"))
);

const AdminAddVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Vehicles/AddVehicle"))
);
const AdminViewVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Vehicles/ViewVehicle"))
);

const AdminMembershipPlans = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/MembershipPlans"))
);

const AdminAddMembershipPlan = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/AddMembershipPlan"))
);

const AdminViewMembershipPlan = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/ViewMembershipPlan"))
);

const AdminMembershipFeatures = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/MembershipFeatures"))
);

const AdminAddMembershipFeature = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/AddMembershipFeature"))
);

const AdminViewMembershipFeature = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/ViewMembershipFeature"))
);

const AdminCustomerSubscriptions = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/CustomerSubscriptions"))
);

const AdminAddCustomerSubscription = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/AddCustomerSubscription"))
);

const AdminViewCustomerSubscription = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/ViewCustomerSubscription"))
);

const AdminCorporateSubscriptions = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/CorporateSubscriptions"))
);

const AdminAddCorporateSubscription = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/AddCorporateSubscription"))
);

const AdminViewCorporateSubscription = WithSuspense(
  lazy(() => import("../pages/Admin/Memberships/ViewCorporateSubscription"))
);

const AdminPayToPark = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/PayToPark"))
);

const AdminViewPayToPark = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/ViewPayToPark"))
);

const AdminReservedParking = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/ReservedParking"))
);

const AdminViewReservedParking = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/ViewReservedParking"))
);

const AdminTips = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/Tips"))
);

const AdminViewTips = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/ViewTips"))
);

const AdminEventParking = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/EventParking"))
);

const AdminViewEventParking = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/ViewEventParking"))
);

const AdminAddReservedParking = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/AddReservedParking"))
);

const AdminCarServices = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/CarServices"))
);

const AdminViewCarService = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/ViewCarService"))
);

const AdminAddCarService = WithSuspense(
  lazy(() => import("../pages/Admin/Transactions/AddCarService"))
);

const AdminClients = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/ClientList"))
);

const AdminAddClient = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/AddClient"))
);

const AdminViewClient = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/ViewClient"))
);

const AdminClientsInvoices = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/ClientsInvoices"))
);

const AdminAddClientInvoice = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/AddClientInvoice"))
);

const AdminViewClientInvoice = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/ViewClientInvoice"))
);

const AdminClientsEvents = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/Events"))
);

const AdminViewClientsEvent = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/ViewEvent"))
);

const AdminAddClientsEvent = WithSuspense(
  lazy(() => import("../pages/Admin/Clients/AddEvent"))
);

const AdminLocations = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/Locations"))
);

const AdminAddLocation = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/AddLocation"))
);

const AdminViewLocation = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/ViewLocation"))
);

const AdminZones = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/Zones"))
);

const AdminAddZone = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/AddZone"))
);

const AdminRepCustomer = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Customers"))
);

const AdminRepTips = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Tips"))
);

const AdminRepHistory = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/History"))
);

const AdminRepInvoice = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Invoices"))
);

const AdminRepLocation = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Locations"))
);

const AdminRepLog = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Logs"))
);

const AdminRepPayment = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Payments"))
);

const AdminRepSubs = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Subs"))
);

const AdminRepVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Vehicles"))
);

const AdminRepZones = WithSuspense(
  lazy(() => import("../pages/Admin/Reports/Zones"))
);
const AdminViewZone = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/ViewZone"))
);

const AdminRates = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/Rates"))
);

const AdminAddRate = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/AddRate"))
);

const AdminViewRate = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/ViewRate"))
);

const AdminAmenities = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/Amenities"))
);

const AdminAddAmenity = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/AddAmenity"))
);

const AdminViewAmenity = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/ViewAmenity"))
);

const AdminPolicies = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/Policies"))
);

const AdminAddPolicy = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/AddPolicy"))
);

const AdminViewPolicy = WithSuspense(
  lazy(() => import("../pages/Admin/Locations/ViewPolicy"))
);

const AdminValetedVehicles = WithSuspense(
  lazy(() => import("../pages/Admin/Logs/ValetedVehicles"))
);

const AdminViewValetedVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Logs/ViewValetedVehice"))
);

const AdminServicedVehicles = WithSuspense(
  lazy(() => import("../pages/Admin/Logs/ServicedVehicles"))
);

const AdminViewServicedVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Logs/ViewServicedVehicle"))
);

const AdminParkedVehicles = WithSuspense(
  lazy(() => import("../pages/Admin/Logs/ParkedVehicles"))
);

const AdminViewParkedVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Logs/ViewParkedVehicle"))
);

const AdminConfigRoles = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/Roles"))
);

const AdminConfigViewRole = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/ViewRole"))
);

const AdminConfigAddRole = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/AddRole"))
);

const AdminConfigPermissions = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/Permissions"))
);

const AdminConfigViewPermission = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/ViewPermission"))
);

const AdminConfigAddPermission = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/AddPermission"))
);

const AdminConfigVehicleMakes = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/VehicleMakes"))
);

const AdminConfigViewVehicleMake = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/ViewVehicleMake"))
);

const AdminConfigAddVehicleMake = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/AddVehicleMake"))
);

const AdminConfigVehicleModels = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/VehicleModels"))
);

const AdminConfigViewVehicleModel = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/ViewVehicleModel"))
);

const AdminConfigAddVehicleModel = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/AddVehicleModel"))
);

const AdminConfigBankDetails = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/BankDetails"))
);

const AdminConfigViewBankDetail = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/ViewBankDetail"))
);

const AdminConfigAddBankDetail = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/AddBankDetail"))
);

const AdminConfigFaqs = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/Faqs"))
);

const AdminConfigViewFaq = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/ViewFaq"))
);

const AdminConfigAddFaq = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/AddFaq"))
);

const AdminConfigQrCode = WithSuspense(
  lazy(() => import("../pages/Admin/Configurations/QrCode"))
);

export const PUBLIC_ROUTES = [
  //CUSTOMER ROUTES
  { path: CUST_LOGIN, element: <CustLogin /> },
  { path: CUST_LOGIN_REDIRECT, element: <CustLogin /> },
  { path: CUST_RESET_PASS, element: <CustResetPassword /> },
  { path: CUST_CHANGE_PASS, element: <CustChangePassword /> },
  { path: CUST_CHANGE_SUCCESS, element: <CustChangeSuccess /> },
  { path: CUST_SIGNUP, element: <CustSignup /> },
  { path: CUST_RESET_SENT, element: <CustResetSent /> },
  { path: CUST_PARK, element: <CustPark /> },
  { path: CUST_SCAN_PARK, element: <CustScan /> },

  //CLIENT ROUTES
  { path: CLIENT_LOGIN, element: <ClientLogin /> },
  { path: CLIENT_RESET_PASS, element: <ClientResetPassword /> },
  { path: CLIENT_CHANGE_PASS, element: <ClientChangePassword /> },
  { path: CLIENT_CHANGE_SUCCESS, element: <ClientChangeSuccess /> },
  { path: CLIENT_RESET_SENT, element: <ClientResetSent /> },

  // OPERATOR ROUTES
  { path: OP_LOGIN, element: <OperatorLogin /> },
  { path: OPERATOR_RESET_PASSWORD, element: <OperatorResetPassword /> },
  { path: OPERATOR_CHANGE_PASS, element: <OperatorChangePassword /> },
  { path: OPERATOR_CHANGE_SUCCESS, element: <OperatorChangeSuccess /> },
  { path: OPERATOR_RESET_SENT, element: <OperatorResetSent /> },

  // ADMIN ROUTES
  { path: ADMIN_LOGIN, element: <AdminLogin /> },
  { path: ADMIN_RESET_PASSWORD, element: <AdminResetPassword /> },
  { path: ADMIN_RESET_PASSWORD_LINK, element: <AdminResetPasswordLink /> },

  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("operator")
            ? "/operator/auth/login"
            : location.pathname.includes("admin")
            ? "/admin/auth/login"
            : location.pathname.includes("client")
            ? "/client/auth/login"
            : "/customer/auth/login"
        }
        replace
      />
    ),
  },
];

export const PRIVATE_ROUTES = [
  // CUSTOMER ROUTES
  { path: CUST_DASHBOARD, element: <CustDashboard /> },
  { path: CUST_SERVICES_PARK, element: <CustServicesPark /> },
  { path: CUST_SERVICE_PARK_DETAILS, element: <CustCompanyParkDetails /> },
  { path: CUST_SERVICE_VALET_DETAILS, element: <CustUsValetParking /> },
  { path: CUST_HISTORY_PARK_DETAILS, element: <CustServicesParkDetails /> },
  {
    path: CUST_SERVICES_RESERVE_PARK_DETAILS,
    element: <CustUsReserveParkDetails />,
  },
  {
    path: CUST_SERVICES_CAR_SERVICE_DETAILS,
    element: <CustServicesCarServiceDetails />,
  },
  {
    path: CUST_HISTORY_RESERVE_PARK_DETAILS,
    element: <CustServicesReserveParkDetails />,
  },
  {
    path: CUST_SERVICES_EVENT_PARK_DETAILS,
    element: <CustUsEventParkDetails />,
  },
  {
    path: CUST_HISTORY_EVENT_PARK_DETAILS,
    element: <CustServicesEventParkDetails />,
  },
  { path: CUST_SERVICES_RESERVE_PARK, element: <CustServicesReservePark /> },
  { path: CUST_SERVICES_EVENT_PARK, element: <CustServicesEventPark /> },
  { path: CUST_SUBSCRIPTION, element: <CustSubscriptions /> },
  { path: CUST_ADD_SUBSCRIPTION, element: <CustAddSubscriptions /> },
  { path: CUST_HELP_CENTER, element: <CustHelp /> },
  { path: CUST_HELP_CENTER_MAIL, element: <CustMail /> },
  { path: CUST_HELP_CENTER_FAQ, element: <CustFaq /> },
  { path: CUST_VEHICLES, element: <CustVehicles /> },
  { path: CUST_HISTORY_US, element: <CustHistoryUs /> },
  { path: CUST_HISTORY_USER, element: <CustHistoryUser /> },
  { path: CUST_SETTINGS, element: <CustSettings /> },
  { path: CUST_PAYMENT, element: <CustPayment /> },
  { path: CUST_PROFILE, element: <CustProfile /> },
  { path: CUST_SERVICES_CAR_SERVICE, element: <CustServicesCar /> },
  { path: CUST_EDIT_PROFILE, element: <CustEditProfile /> },

  // CLIENT ROUTES
  { path: CLIENT_DASHBOARD, element: <ClientDashboard /> },
  { path: CLIENT_USERS, element: <ClientUsers /> },
  { path: CLIENT_ADD_USER, element: <ClientAddUser /> },
  { path: CLIENT_EVENTS, element: <ClientEvents /> },
  { path: CLIENT_EVENTS, element: <ClientEvents /> },
  { path: CLIENT_EVENTS, element: <ClientEvents /> },
  { path: CLIENT_TRAN, element: <ClientTran /> },
  { path: CLIENT_TRAN_DETAILS, element: <ClientTranDetails /> },
  { path: CLIENT_LOGS, element: <ClientLogs /> },
  { path: CLIENT_LOGS_DETAILS, element: <ClientLogsDetails /> },
  { path: CLIENT_LOGS_VALET, element: <ClientLogsValet /> },
  { path: CLIENT_LOGS_VALET_DETAILS, element: <ClientLogsValetDetails /> },
  { path: CLIENT_ADD_EVENT, element: <ClientAddEvent /> },
  { path: CLIENT_EDIT_EVENT, element: <ClientEditEvent /> },
  { path: CLIENT_ADD_SUB, element: <ClientAddSub /> },
  { path: CLIENT_VIEW_SUB, element: <ClientViewSub /> },
  { path: CLIENT_PROFILE, element: <ClientProfile /> },

  // OPERATOR ROUTES
  { path: OP_DASHBOARD, element: <OpDashboard /> },
  { path: OP_ATTENDANT, element: <OpAttendant /> },
  { path: OP_ADD_ATTENDANT, element: <OpAddAttendant /> },
  { path: OP_ATTENDANT_DETAILS, element: <OpAttendantDetails /> },
  { path: OP_LOCATIONS, element: <OpLocation /> },
  { path: OP_LOCATION_DETAILS, element: <OpLocationDetails /> },
  { path: OP_ADD_LOCATION, element: <OpAddLocation /> },
  { path: OP_RATES, element: <OpRate /> },
  { path: OP_ADD_RATE, element: <OpAddRate /> },
  { path: OP_RATE_DETAILS, element: <OpRateDetails /> },
  { path: OP_ZONES, element: <OpZone /> },
  { path: OP_TRANSACTION, element: <OpTransactions /> },
  { path: OP_TRANSACTION_DETAILS, element: <OpTransactionDetails /> },
  { path: OP_ZONE_DETAILS, element: <OpZoneDetails /> },
  { path: OP_ADD_ZONE, element: <OpAddZone /> },
  { path: OP_POLICIES, element: <OpPolicies /> },
  { path: OP_POLICY_DETAILS, element: <OpPolicyDetails /> },
  { path: OP_ADD_POLICY, element: <OpAddPolicy /> },
  { path: OP_VALETED, element: <OpValeted /> },
  { path: OP_VALETED_DETAILS, element: <OpValetedDetails /> },
  { path: OP_PARKED, element: <OpParked /> },
  { path: OP_PARKED_DETAILS, element: <OpParkedDetails /> },
  { path: OP_SERVICED, element: <OpServiced /> },
  { path: OP_SERVICED_DETAILS, element: <OpServicedDetails /> },
  { path: OP_REP_PAYMENTS, element: <OpRepPayment /> },
  { path: OP_REP_LOCATIONS, element: <OpRepLocation /> },
  { path: OP_REP_ZONES, element: <OpRepZone /> },
  { path: OP_REP_LOGS, element: <OpRepLog /> },
  { path: OP_PROFILE, element: <OpProfile /> },
  { path: OP_PTP_TRANSACTION, element: <OpPtpTransactions /> },
  { path: OP_PTP_TRANSACTION_DETAILS, element: <OpPtpTransactionDetails /> },
  { path: OP_RP_TRANSACTION, element: <OpRpTransactions /> },
  { path: OP_RP_TRANSACTION_DETAILS, element: <OpRpTransactionDetails /> },
  { path: OP_EV_TRANSACTION, element: <OpEvTransactions /> },
  { path: OP_EV_TRANSACTION_DETAILS, element: <OpEvTransactionDetails /> },
  { path: OP_SERVICE_TRANSACTION, element: <OpServiceTransactions /> },
  {
    path: OP_SERVICE_TRANSACTION_DETAILS,
    element: <OpServiceTransactionDetails />,
  },

  // ADMIN ROUTES
  { path: ADMIN_DASHBOARD, element: <AdminDashboard /> },
  { path: ADMIN_CUSTOMERS, element: <AdminCustomers /> },
  { path: ADMIN_SERVICES, element: <AdminServices /> },
  { path: ADMIN_ADMINISTRATORS, element: <AdminAdministrators /> },
  { path: ADMIN_OPERATORS, element: <AdminOperators /> },
  { path: ADMIN_ATTENDANTS, element: <AdminAttendants /> },
  { path: ADMIN_ADD_ATTENDANT, element: <AdminAddAttendant /> },
  { path: ADMIN_VIEW_ATTENDANT, element: <AdminViewAttendant /> },
  { path: ADMIN_ADD_CUSTOMER, element: <AdminAddCustomer /> },
  { path: ADMIN_VIEW_CUSTOMER, element: <AdminViewCustomer /> },
  { path: ADMIN_ADD_ADMINISTRATOR, element: <AdminAddAdministrator /> },
  { path: ADMIN_VIEW_ADMINISTRATOR, element: <AdminViewAdministrator /> },
  { path: ADMIN_ADD_OPERATOR, element: <AdminAddOperator /> },
  { path: ADMIN_VIEW_OPERATOR, element: <AdminViewOperator /> },
  { path: ADMIN_VEHICLES, element: <AdminVehicles /> },
  { path: ADMIN_ADD_VEHICLE, element: <AdminAddVehicle /> },
  { path: ADMIN_VIEW_VEHICLE, element: <AdminViewVehicle /> },
  { path: ADMIN_MEMBERSHIP_PLANS, element: <AdminMembershipPlans /> },
  { path: ADMIN_ADD_MEMBERSHIP_PLAN, element: <AdminAddMembershipPlan /> },
  { path: ADMIN_VIEW_MEMBERSHIP_PLAN, element: <AdminViewMembershipPlan /> },
  { path: ADMIN_PROFILE, element: <AdminProfile /> },
  { path: ADMIN_EDIT_PROFILE, element: <AdminUpdateProfile /> },
  { path: ADMIN_MEMBERSHIP_FEATURES, element: <AdminMembershipFeatures /> },
  {
    path: ADMIN_ADD_MEMBERSHIP_FEATURE,
    element: <AdminAddMembershipFeature />,
  },
  {
    path: ADMIN_VIEW_MEMBERSHIP_FEATURE,
    element: <AdminViewMembershipFeature />,
  },

  {
    path: ADMIN_CUSTOMER_SUBSCRIPTIONS,
    element: <AdminCustomerSubscriptions />,
  },

  {
    path: ADMIN_ADD_CUSTOMER_SUBSCRIPTION,
    element: <AdminAddCustomerSubscription />,
  },

  {
    path: ADMIN_VIEW_CUSTOMER_SUBSCRIPTION,
    element: <AdminViewCustomerSubscription />,
  },

  {
    path: ADMIN_CORPORATE_SUBSCRIPTIONS,
    element: <AdminCorporateSubscriptions />,
  },

  {
    path: ADMIN_ADD_CORPORATE_SUBSCRIPTION,
    element: <AdminAddCorporateSubscription />,
  },

  {
    path: ADMIN_VIEW_CORPORATE_SUBSCRIPTION,
    element: <AdminViewCorporateSubscription />,
  },

  {
    path: ADMIN_PAYTOPARK,
    element: <AdminPayToPark />,
  },

  {
    path: ADMIN_VIEW_PAYTOPARK,
    element: <AdminViewPayToPark />,
  },

  {
    path: ADMIN_RESERVED_PARKING,
    element: <AdminReservedParking />,
  },
  {
    path: ADMIN_VIEW_RESERVED_PARKING,
    element: <AdminViewReservedParking />,
  },
  {
    path: ADMIN_TIPS,
    element: <AdminTips />,
  },
  {
    path: ADMIN_VIEWTIPS,
    element: <AdminViewTips />,
  },
  {
    path: ADMIN_EVENTPARK,
    element: <AdminEventParking />,
  },
  {
    path: ADMIN_VIEW_EVENTPARK,
    element: <AdminViewEventParking />,
  },

  {
    path: ADMIN_ADD_RESERVED_PARKING,
    element: <AdminAddReservedParking />,
  },

  {
    path: ADMIN_CAR_SERVICES,
    element: <AdminCarServices />,
  },

  {
    path: ADMIN_ADD_CAR_SERVICE,
    element: <AdminAddCarService />,
  },

  {
    path: ADMIN_VIEW_CAR_SERVICE,
    element: <AdminViewCarService />,
  },

  {
    path: ADMIN_CLIENTS,
    element: <AdminClients />,
  },

  {
    path: ADMIN_ADD_CLIENT,
    element: <AdminAddClient />,
  },

  {
    path: ADMIN_VIEW_CLIENT,
    element: <AdminViewClient />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CLIENTS_INVOICES,
    element: <AdminClientsInvoices />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_CLIENT_INVOICE,
    element: <AdminAddClientInvoice />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_CLIENT_INVOICE,
    element: <AdminViewClientInvoice />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_EVENTS,
    element: <AdminClientsEvents />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_EVENT,
    element: <AdminViewClientsEvent />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_EVENT,
    element: <AdminAddClientsEvent />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_LOCATIONS,
    element: <AdminLocations />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_LOCATION,
    element: <AdminAddLocation />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_LOCATION,
    element: <AdminViewLocation />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ZONES,
    element: <AdminZones />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_ZONE,
    element: <AdminAddZone />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_CUSTOMERS,
    element: <AdminRepCustomer />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_TIPS,
    element: <AdminRepTips />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_HISTORY,
    element: <AdminRepHistory />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_INVOICES,
    element: <AdminRepInvoice />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_LOCATIONS,
    element: <AdminRepLocation />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_LOGS,
    element: <AdminRepLog />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_PAYMENTS,
    element: <AdminRepPayment />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_SUBS,
    element: <AdminRepSubs />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_VEHICLES,
    element: <AdminRepVehicle />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_REP_ZONES,
    element: <AdminRepZones />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_ZONE,
    element: <AdminViewZone />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_RATES,
    element: <AdminRates />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_RATE,
    element: <AdminViewRate />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_RATE,
    element: <AdminAddRate />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_AMENITIES,
    element: <AdminAmenities />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_AMENITY,
    element: <AdminAddAmenity />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_AMENITY,
    element: <AdminViewAmenity />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_POLICIES,
    element: <AdminPolicies />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_POLICY,
    element: <AdminViewPolicy />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_POLICY,
    element: <AdminAddPolicy />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VALETED_VEHICLES,
    element: <AdminValetedVehicles />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_VALETED_VEHICLE,
    element: <AdminViewValetedVehicle />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_PARKED_VEHICLES,
    element: <AdminParkedVehicles />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_PARKED_VEHICLE,
    element: <AdminViewParkedVehicle />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_SERVICED_VEHICLES,
    element: <AdminServicedVehicles />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_VIEW_SERVICED_VEHICLE,
    element: <AdminViewServicedVehicle />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_ROLES,
    element: <AdminConfigRoles />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_ADD_ROLE,
    element: <AdminConfigAddRole />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VIEW_ROLE,
    element: <AdminConfigViewRole />,
  },
  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_PERMISSIONS,
    element: <AdminConfigPermissions />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_ADD_PERMISSION,
    element: <AdminConfigAddPermission />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VIEW_PERMISSION,
    element: <AdminConfigViewPermission />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MAKES,
    element: <AdminConfigVehicleMakes />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_ADD_VEHICLE_MAKE,
    element: <AdminConfigAddVehicleMake />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VIEW_VEHICLE_MAKE,
    element: <AdminConfigViewVehicleMake />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VEHICLE_MODELS,
    element: <AdminConfigVehicleModels />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_ADD_VEHICLE_MODEL,
    element: <AdminConfigAddVehicleModel />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VIEW_VEHICLE_MODEL,
    element: <AdminConfigViewVehicleModel />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_BANK_DETAILS,
    element: <AdminConfigBankDetails />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_ADD_BANK_DETAIL,
    element: <AdminConfigAddBankDetail />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VIEW_BANK_DETAIL,
    element: <AdminConfigViewBankDetail />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_FAQS,
    element: <AdminConfigFaqs />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_ADD_FAQ,
    element: <AdminConfigAddFaq />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_VIEW_FAQ,
    element: <AdminConfigViewFaq />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_CONFIG_QR_CODE,
    element: <AdminConfigQrCode />,
  },

  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("operator")
            ? "/operator/dashboard"
            : location.pathname.includes("client")
            ? "/client/dashboard"
            : location.pathname.includes("admin")
            ? "/admin/dashboard"
            : "/customer/dashboard"
        }
        replace
      />
    ),
  },
];
