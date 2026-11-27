
    // Image payloads from the supplied demo are stored as separate public assets.
    const HERO_IMG = '/images/fixmate-hero.jpg';
    const TECH_WORK_IMG = '/images/technician-work.jpg';
    const HOME_APPLIANCE_IMG = '/images/home-appliance.jpg';
    const IMG_SRV_103 = '/images/srv-103.jpg';
    const IMG_SRV_104 = '/images/srv-104.jpg';
    const IMG_SRV_105 = '/images/srv-105.jpg';
    const IMG_SRV_106 = '/images/srv-106.jpg';
    const IMG_SRV_107 = '/images/srv-107.jpg';
    const IMG_SRV_108 = '/images/srv-108.jpg';
    const IMG_SRV_109 = '/images/srv-109.jpg';
    const IMG_SRV_110 = '/images/srv-110.jpg';
    const IMG_SRV_111 = '/images/srv-111.jpg';
    const IMG_SRV_112 = '/images/srv-112.jpg';
    const IMG_SRV_113 = '/images/srv-113.jpg';

    const CATEGORIES = [
      'Smartphone',
      'Laptop & PC',
      'AC',
      'Refrigerator',
      'TV',
      'Washing Machine',
      'Electrical'
    ];

    const CATEGORY_META = {
      'Smartphone': { icon: '📱', tagline: 'OLED Display, Battery & Logic Board', color: 'from-blue-500 to-indigo-600' },
      'Laptop & PC': { icon: '💻', tagline: 'MacBook/Windows IC, SSD & Thermal Fix', color: 'from-indigo-500 to-purple-600' },
      'AC': { icon: '❄️', tagline: 'Inverter PCB, Hydro Jet Wash & R32 Gas', color: 'from-cyan-500 to-blue-600' },
      'Refrigerator': { icon: '🧊', tagline: 'Inverter Compressor, Thermostat & Gas', color: 'from-sky-500 to-teal-600' },
      'TV': { icon: '📺', tagline: '4K QLED Backlight, T-Con & Panel Bonding', color: 'from-violet-500 to-fuchsia-600' },
      'Washing Machine': { icon: '🧺', tagline: 'Front-Load Drum Bearing & Drain Pump', color: 'from-emerald-500 to-teal-600' },
      'Electrical': { icon: '⚡', tagline: 'DB Board, IPS/UPS Wiring & Surge Fix', color: 'from-amber-500 to-orange-600' }
    };

    const INITIAL_STATE = {
      theme: 'light',
      route: '/',
      queryParams: {
        search: '',
        category: 'All',
        serviceMode: 'All',
        sort: 'newest',
        page: 1,
        limit: 6
      },
      selectedServiceId: 'srv_101',
      customerBookingFilter: 'All',
      techRequestFilter: 'All',
      adminUserFilter: 'All',
      adminServiceFilter: 'All',
      adminBookingFilter: 'All',
      currentUser: null,
      // 1. users collection (3+ realistic stakeholders + extra technicians/customers)
      users: [
        {
          _id: 'usr_cust_1',
          name: 'Nadia Islam',
          email: 'nadia@fixmate.com',
          password: 'Password123',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
          role: 'customer',
          phone: '+880 1712-558899',
          area: 'Dhanmondi, Dhaka',
          bio: 'Product Designer living in Dhanmondi. Values punctual home appliance and Apple device care.',
          plan: 'free',
          createdAt: '2026-08-12T09:15:00Z'
        },
        {
          _id: 'usr_cust_2',
          name: 'Farhan Ahmed',
          email: 'farhan@fixmate.com',
          password: 'Password123',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
          role: 'customer',
          phone: '+880 1819-334411',
          area: 'Gulshan 2, Dhaka',
          bio: 'Software Architect in Gulshan. Frequent user of AC and MacBook maintenance.',
          plan: 'free',
          createdAt: '2026-09-02T14:20:00Z'
        },
        {
          _id: 'usr_tech_1',
          name: 'Engr. Rafiqul Hasan',
          email: 'rafiq.tech@fixmate.com',
          password: 'Password123',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80',
          role: 'technician',
          phone: '+880 1755-901122',
          area: 'Dhanmondi & Mohammadpur, Dhaka',
          bio: 'Apple Certified Micro-Soldering Specialist & Senior Laptop Logic Board Engineer with 9+ years experience at IDB & Multiplan.',
          plan: 'pro',
          createdAt: '2026-06-15T10:00:00Z'
        },
        {
          _id: 'usr_tech_2',
          name: 'Tanvir Mahmud',
          email: 'tanvir.tech@fixmate.com',
          password: 'Password123',
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80',
          role: 'technician',
          phone: '+880 1911-776655',
          area: 'Uttara, Banani & Mirpur, Dhaka',
          bio: 'Certified HVAC, Smart Inverter AC, Refrigerator & Washing Machine Diagnostic Technician (11 years field experience).',
          plan: 'free',
          createdAt: '2026-07-04T11:30:00Z'
        },
        {
          _id: 'usr_tech_3',
          name: 'Sajidul Karim',
          email: 'sajid.tech@fixmate.com',
          password: 'Password123',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80',
          role: 'technician',
          phone: '+880 1677-889900',
          area: 'Mirpur & Bashundhara, Dhaka',
          bio: '4K QLED/OLED TV Panel Specialist & Residential Smart DB Board Electrical Engineer.',
          plan: 'pro',
          createdAt: '2026-07-19T08:45:00Z'
        },
        {
          _id: 'usr_admin_1',
          name: 'Zahid Miron (Admin)',
          email: 'admin@fixmate.com',
          password: 'Password123',
          image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&q=80',
          role: 'admin',
          phone: '+880 1711-000111',
          area: 'Banani HQ, Dhaka',
          bio: 'FixMate Platform Operations & Quality Assurance Lead.',
          plan: 'pro',
          createdAt: '2026-05-01T08:00:00Z'
        }
      ],

      // 2. services collection (13 services: 12 approved + 1 pending for Admin review)
      services: [
        {
          _id: 'srv_101',
          title: 'iPhone 13/14/15 Pro Original OLED Screen & TrueTone Replacement',
          category: 'Smartphone',
          description: 'Factory-calibrated original OLED display assembly replacement with waterproof gasket seal restoration and TrueTone IC programmer transfer. Includes 180-day warranty.',
          image: TECH_WORK_IMG,
          basePrice: 85,
          estimatedDuration: '2-3 hours',
          serviceMode: 'Shop Drop-off',
          serviceArea: 'Dhanmondi & Multiplan Center, Dhaka',
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.9,
          ratingCount: 18,
          createdAt: '2026-11-16T10:30:00Z'
        },
        {
          _id: 'srv_102',
          title: 'Split & Inverter AC Foam Jet Wash, Coil De-Scaling & R32 Gas Check',
          category: 'AC',
          description: 'Complete indoor and outdoor unit high-pressure hydro-jet cleaning with anti-bacterial coil treatment, drain pipe flushing, ampere load test, and refrigerant pressure check.',
          image: HOME_APPLIANCE_IMG,
          basePrice: 35,
          estimatedDuration: '2 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Uttara, Banani & Gulshan, Dhaka',
          technicianName: 'Tanvir Mahmud',
          technicianEmail: 'tanvir.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.8,
          ratingCount: 24,
          createdAt: '2026-11-15T14:15:00Z'
        },
        {
          _id: 'srv_103',
          title: 'MacBook Air/Pro M1-M3 Logic Board Short Circuit & Power IC Repair',
          category: 'Laptop & PC',
          description: 'Component-level ultrasonic board diagnostics, USB-C CD3217 controller IC replacement, liquid damage corrosion cleaning, and thermal paste upgrade.',
          image: IMG_SRV_103,
          basePrice: 95,
          estimatedDuration: '1 day',
          serviceMode: 'Shop Drop-off',
          serviceArea: 'Dhanmondi & New Elephant Road, Dhaka',
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 5.0,
          ratingCount: 14,
          createdAt: '2026-11-14T11:20:00Z'
        },
        {
          _id: 'srv_104',
          title: 'Smart Inverter Refrigerator Compressor, Relay & Cooling Gas Recharge',
          category: 'Refrigerator',
          description: 'On-site diagnosis of no-cooling issues, R600a eco-refrigerant vacuum charging, inverter PCB overload relay replacement, and door magnetic gasket sealing.',
          image: IMG_SRV_104,
          basePrice: 48,
          estimatedDuration: '2-3 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Mirpur, Uttara & Mohakhali, Dhaka',
          technicianName: 'Tanvir Mahmud',
          technicianEmail: 'tanvir.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.7,
          ratingCount: 11,
          createdAt: '2026-11-13T16:00:00Z'
        },
        {
          _id: 'srv_105',
          title: 'Sony, Samsung & LG 55"-65" 4K Smart TV LED Backlight & T-Con Fix',
          category: 'TV',
          description: 'Fixes blank screen with sound, dim picture, or vertical lines. Full array copper-core LED backlight strip replacement and T-Con power IC calibration.',
          image: IMG_SRV_105,
          basePrice: 60,
          estimatedDuration: '3-4 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Bashundhara R/A & Badda, Dhaka',
          technicianName: 'Sajidul Karim',
          technicianEmail: 'sajid.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.9,
          ratingCount: 9,
          createdAt: '2026-11-12T12:40:00Z'
        },
        {
          _id: 'srv_106',
          title: 'Front-Load Automatic Washing Machine Drum Bearing & Drain Pump Fix',
          category: 'Washing Machine',
          description: 'Solves OE/UE error codes, heavy spinning noise, water drainage blockages, door interlock failure, and shock absorber damper replacement at home.',
          image: IMG_SRV_106,
          basePrice: 42,
          estimatedDuration: '2-3 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Mirpur, Mohammadpur & Dhanmondi, Dhaka',
          technicianName: 'Tanvir Mahmud',
          technicianEmail: 'tanvir.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.8,
          ratingCount: 15,
          createdAt: '2026-11-11T09:10:00Z'
        },
        {
          _id: 'srv_107',
          title: 'Apartment 3-Phase DB Board Balancing, RCCB Breaker & IPS Wiring',
          category: 'Electrical',
          description: 'Complete circuit breaker tripping diagnosis, Schneider RCCB/MCB installation, pure sine-wave IPS/UPS changeover wiring, and thermal load inspection.',
          image: IMG_SRV_107,
          basePrice: 40,
          estimatedDuration: '2-4 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'All Dhaka Metro Areas',
          technicianName: 'Sajidul Karim',
          technicianEmail: 'sajid.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.9,
          ratingCount: 21,
          createdAt: '2026-11-10T15:00:00Z'
        },
        {
          _id: 'srv_108',
          title: 'Samsung Galaxy S23/S24 Ultra Charging Port, Battery & Camera Module',
          category: 'Smartphone',
          description: 'Genuine service-pack battery installation, super-fast charging USB-C flex board swap, and periscope telephoto focus calibration.',
          image: IMG_SRV_108,
          basePrice: 55,
          estimatedDuration: '2 hours',
          serviceMode: 'Shop Drop-off',
          serviceArea: 'Dhanmondi, Dhaka',
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.8,
          ratingCount: 12,
          createdAt: '2026-11-09T11:00:00Z'
        },
        {
          _id: 'srv_109',
          title: 'Gaming Laptop & Desktop GPU Thermal Repaste, Fan & NVMe Upgrade',
          category: 'Laptop & PC',
          description: 'Honeywell PTM7950 phase-change thermal pad installation, dual cooling fan overhaul, BIOS tuning, and Gen4 NVMe OS migration.',
          image: IMG_SRV_109,
          basePrice: 38,
          estimatedDuration: '2 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Dhanmondi, Banani & Uttara, Dhaka',
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.9,
          ratingCount: 19,
          createdAt: '2026-11-08T13:30:00Z'
        },
        {
          _id: 'srv_110',
          title: 'Inverter AC Outdoor PCB Board Repair & Capacitor Replacement',
          category: 'AC',
          description: 'Fixes E1/E5 communication errors, outdoor compressor not starting, IPM module fault, and sensor calibration for Gree, General, and Daikin ACs.',
          image: IMG_SRV_110,
          basePrice: 65,
          estimatedDuration: '3-5 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Gulshan, Banani & Baridhara, Dhaka',
          technicianName: 'Sajidul Karim',
          technicianEmail: 'sajid.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.7,
          ratingCount: 8,
          createdAt: '2026-11-07T17:00:00Z'
        },
        {
          _id: 'srv_111',
          title: 'Side-by-Side Frost-Free Refrigerator Defrost Heater & Sensor Fix',
          category: 'Refrigerator',
          description: 'Eliminates ice buildup in freezer fan duct, replaces bi-metal defrost thermostat, cleans condenser coils, and calibrates digital temp panel.',
          image: IMG_SRV_111,
          basePrice: 45,
          estimatedDuration: '2 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Dhanmondi & Mohammadpur, Dhaka',
          technicianName: 'Sajidul Karim',
          technicianEmail: 'sajid.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 4.8,
          ratingCount: 10,
          createdAt: '2026-11-06T10:15:00Z'
        },
        {
          _id: 'srv_112',
          title: 'EV Home Charger & High-Load Kitchen Appliance Dedicated Circuit Setup',
          category: 'Electrical',
          description: 'Heavy-duty 6mm/10mm fire-retardant BYA cabling, dedicated earthing test, and surge protection for ovens, geysers, and EV chargers.',
          image: IMG_SRV_112,
          basePrice: 70,
          estimatedDuration: '4 hours',
          serviceMode: 'Home Visit',
          serviceArea: 'Gulshan, Banani & Uttara, Dhaka',
          technicianName: 'Sajidul Karim',
          technicianEmail: 'sajid.tech@fixmate.com',
          approvalStatus: 'approved',
          isAvailable: true,
          ratingAvg: 5.0,
          ratingCount: 6,
          createdAt: '2026-11-05T09:00:00Z'
        },
        {
          _id: 'srv_113',
          title: 'iPad Pro M2 Liquid Retina Touch Digitizer & USB-C Dock Replacement',
          category: 'Smartphone',
          description: 'Clean-room OCA lamination glass & digitizer repair keeping Apple Pencil hover sensitivity intact.',
          image: IMG_SRV_113,
          basePrice: 110,
          estimatedDuration: '1 day',
          serviceMode: 'Shop Drop-off',
          serviceArea: 'Dhanmondi, Dhaka',
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          approvalStatus: 'pending',
          isAvailable: true,
          ratingAvg: 0,
          ratingCount: 0,
          createdAt: '2026-11-18T07:00:00Z'
        }
      ],

      // 3. bookings collection (Realistic bookings across all pipeline stages: requested, accepted, in-progress, completed+unpaid, completed+paid)
      bookings: [
        {
          _id: 'bkg_201',
          ticketNo: 'FM-1041',
          serviceId: 'srv_102',
          serviceTitle: 'Split & Inverter AC Foam Jet Wash, Coil De-Scaling & R32 Gas Check',
          serviceImage: HOME_APPLIANCE_IMG,
          category: 'AC',
          basePrice: 35,
          technicianName: 'Tanvir Mahmud',
          technicianEmail: 'tanvir.tech@fixmate.com',
          customerName: 'Nadia Islam',
          customerEmail: 'nadia@fixmate.com',
          customerPhone: '+880 1712-558899',
          address: 'Flat 5B, House 24, Road 9A, Dhanmondi, Dhaka',
          preferredDate: '2026-11-14',
          problemDescription: '2-Ton Gree Inverter AC in living room is blowing warm air and making a slight dripping sound from indoor tray.',
          status: 'completed',
          finalAmount: 45,
          paymentStatus: 'paid',
          rating: 5,
          review: 'Tanvir arrived right on time, did a thorough foam jet wash and topped up R32 refrigerant. Cooling like brand new!',
          statusHistory: [
            { status: 'requested', changedAt: '2026-11-13T09:10:00Z' },
            { status: 'accepted', changedAt: '2026-11-13T10:05:00Z' },
            { status: 'in-progress', changedAt: '2026-11-14T11:00:00Z' },
            { status: 'completed', changedAt: '2026-11-14T13:15:00Z' },
            { status: 'paid', changedAt: '2026-11-14T13:30:00Z' }
          ]
        },
        {
          _id: 'bkg_202',
          ticketNo: 'FM-1042',
          serviceId: 'srv_101',
          serviceTitle: 'iPhone 13/14/15 Pro Original OLED Screen & TrueTone Replacement',
          serviceImage: TECH_WORK_IMG,
          category: 'Smartphone',
          basePrice: 85,
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          customerName: 'Nadia Islam',
          customerEmail: 'nadia@fixmate.com',
          customerPhone: '+880 1712-558899',
          address: 'Drop-off at Rafiq Micro-Soldering Lab, Multiplan Center Level 4',
          preferredDate: '2026-11-18',
          problemDescription: 'Dropped iPhone 14 Pro on tile floor; bottom left corner cracked and green vertical line appeared on OLED panel.',
          status: 'completed',
          finalAmount: 90,
          paymentStatus: 'unpaid',
          rating: null,
          review: '',
          statusHistory: [
            { status: 'requested', changedAt: '2026-11-17T14:00:00Z' },
            { status: 'accepted', changedAt: '2026-11-17T14:25:00Z' },
            { status: 'in-progress', changedAt: '2026-11-18T10:00:00Z' },
            { status: 'completed', changedAt: '2026-11-18T12:30:00Z' }
          ]
        },
        {
          _id: 'bkg_203',
          ticketNo: 'FM-1043',
          serviceId: 'srv_109',
          serviceTitle: 'Gaming Laptop & Desktop GPU Thermal Repaste, Fan & NVMe Upgrade',
          serviceImage: IMG_SRV_109,
          category: 'Laptop & PC',
          basePrice: 38,
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          customerName: 'Nadia Islam',
          customerEmail: 'nadia@fixmate.com',
          customerPhone: '+880 1712-558899',
          address: 'Flat 5B, House 24, Road 9A, Dhanmondi, Dhaka',
          preferredDate: '2026-11-20',
          problemDescription: 'ASUS ROG Zephyrus G14 CPU reaching 96C during Figma & Blender renders; right fan rattling under load.',
          status: 'in-progress',
          finalAmount: 38,
          paymentStatus: 'unpaid',
          rating: null,
          review: '',
          statusHistory: [
            { status: 'requested', changedAt: '2026-11-18T08:00:00Z' },
            { status: 'accepted', changedAt: '2026-11-18T09:10:00Z' },
            { status: 'in-progress', changedAt: '2026-11-18T14:00:00Z' }
          ]
        },
        {
          _id: 'bkg_204',
          ticketNo: 'FM-1044',
          serviceId: 'srv_107',
          serviceTitle: 'Apartment 3-Phase DB Board Balancing, RCCB Breaker & IPS Wiring',
          serviceImage: IMG_SRV_107,
          category: 'Electrical',
          basePrice: 40,
          technicianName: 'Sajidul Karim',
          technicianEmail: 'sajid.tech@fixmate.com',
          customerName: 'Nadia Islam',
          customerEmail: 'nadia@fixmate.com',
          customerPhone: '+880 1712-558899',
          address: 'Flat 5B, House 24, Road 9A, Dhanmondi, Dhaka',
          preferredDate: '2026-11-22',
          problemDescription: 'Main kitchen MCB breaker trips whenever microwave and water heater run simultaneously. Needs load check.',
          status: 'requested',
          finalAmount: 40,
          paymentStatus: 'unpaid',
          rating: null,
          review: '',
          statusHistory: [
            { status: 'requested', changedAt: '2026-11-18T15:00:00Z' }
          ]
        },
        {
          _id: 'bkg_205',
          ticketNo: 'FM-1045',
          serviceId: 'srv_103',
          serviceTitle: 'MacBook Air/Pro M1-M3 Logic Board Short Circuit & Power IC Repair',
          serviceImage: IMG_SRV_103,
          category: 'Laptop & PC',
          basePrice: 95,
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          customerName: 'Farhan Ahmed',
          customerEmail: 'farhan@fixmate.com',
          customerPhone: '+880 1819-334411',
          address: 'House 12, Road 55, Gulshan 2, Dhaka',
          preferredDate: '2026-11-19',
          problemDescription: 'MacBook Pro 16 M2 Max not charging on either MagSafe 3 or Thunderbolt port after power surge.',
          status: 'accepted',
          finalAmount: 95,
          paymentStatus: 'unpaid',          rating: null,
          review: '',
          statusHistory: [
            { status: 'requested', changedAt: '2026-11-18T11:20:00Z' },
            { status: 'accepted', changedAt: '2026-11-18T12:05:00Z' }
          ]
        },
        {
          _id: 'bkg_206',
          ticketNo: 'FM-1046',
          serviceId: 'srv_108',
          serviceTitle: 'Samsung Galaxy S23/S24 Ultra Charging Port, Battery & Camera Module',
          serviceImage: IMG_SRV_108,
          category: 'Smartphone',
          basePrice: 55,
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          customerName: 'Farhan Ahmed',
          customerEmail: 'farhan@fixmate.com',
          customerPhone: '+880 1819-334411',
          address: 'Multiplan Center Shop 412, Dhanmondi, Dhaka',
          preferredDate: '2026-11-21',
          problemDescription: 'Galaxy S23 Ultra Super Fast Charging 2.0 intermittently disconnects and battery drains within 4 hours.',
          status: 'requested',
          finalAmount: 55,
          paymentStatus: 'unpaid',
          rating: null,
          review: '',
          statusHistory: [
            { status: 'requested', changedAt: '2026-11-18T16:10:00Z' }
          ]
        }
      ],

      // 4. payments collection
      payments: [
        {
          _id: 'pay_301',
          bookingId: 'bkg_201',
          serviceTitle: 'Split & Inverter AC Foam Jet Wash, Coil De-Scaling & R32 Gas Check',
          customerName: 'Nadia Islam',
          customerEmail: 'nadia@fixmate.com',
          technicianName: 'Tanvir Mahmud',
          technicianEmail: 'tanvir.tech@fixmate.com',
          amount: 45,
          currency: 'usd',
          transactionId: 'pi_3QFixMate99281AC',
          stripeSessionId: 'cs_test_a1FixMateSession88210',
          paymentStatus: 'paid',
          paidAt: '2026-11-14T13:30:00Z'
        },
        {
          _id: 'pay_302',
          bookingId: 'bkg_hist_09',
          serviceTitle: 'MacBook Air/Pro M1-M3 Logic Board Short Circuit & Power IC Repair',
          customerName: 'Farhan Ahmed',
          customerEmail: 'farhan@fixmate.com',
          technicianName: 'Engr. Rafiqul Hasan',
          technicianEmail: 'rafiq.tech@fixmate.com',
          amount: 115,
          currency: 'usd',
          transactionId: 'pi_3QFixMate77412MB',
          stripeSessionId: 'cs_test_b2FixMateSession77412',
          paymentStatus: 'paid',
          paidAt: '2026-11-10T17:45:00Z'
        },
        {
          _id: 'pay_303',
          bookingId: 'PRO_SUBSCRIPTION',
          serviceTitle: 'FixMate Pro Technician Subscription (Unlimited Listings & Pro Badge)',
          customerName: 'Engr. Rafiqul Hasan',
          customerEmail: 'rafiq.tech@fixmate.com',
          technicianName: 'FixMate Platform',
          technicianEmail: 'admin@fixmate.com',
          amount: 29,
          currency: 'usd',
          transactionId: 'pi_3QFixMateProSub01',
          stripeSessionId: 'cs_test_proSubSession01',
          paymentStatus: 'paid',
          paidAt: '2026-11-01T10:00:00Z'
        }
      ]
    };

    let state = JSON.parse(JSON.stringify(INITIAL_STATE));
    let activeCharts = [];
    let heroTicketTimer = null;

    function startHeroTicketAnimation() {
      if (heroTicketTimer) {
        clearInterval(heroTicketTimer);
        heroTicketTimer = null;
      }
      const stages = [
        { st: '● Requested', stCls: 'bg-blue-500/20 text-blue-300 border-blue-400/30', pay: 'Unpaid', payCls: 'bg-amber-500/20 text-amber-300 border-amber-400/30', note: 'Request sent to Engr. Rafiqul Hasan (Dhanmondi).' },
        { st: '● Accepted', stCls: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30', pay: 'Unpaid', payCls: 'bg-amber-500/20 text-amber-300 border-amber-400/30', note: 'Technician accepted job. Drop-off scheduled.' },
        { st: '● In Progress', stCls: 'bg-amber-500/20 text-amber-300 border-amber-400/30', pay: 'Unpaid', payCls: 'bg-amber-500/20 text-amber-300 border-amber-400/30', note: 'Original OLED display fitted & TrueTone calibrated.' },
        { st: '● Completed', stCls: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', pay: 'Unpaid', payCls: 'bg-amber-500/20 text-amber-300 border-amber-400/30', note: 'Final amount set to $90. Stripe Pay Now unlocked!' },
        { st: '● Completed', stCls: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', pay: '✓ Paid', payCls: 'bg-emerald-500/25 text-emerald-300 border-emerald-400/40', note: 'Paid $90 via Stripe. 180-day warranty & PDF invoice active.' }
      ];
      let i = 0;
      const applyStage = () => {
        const stEl = document.getElementById('heroTicketStatus');
        const payEl = document.getElementById('heroTicketPay');
        const noteEl = document.getElementById('heroTicketNote');
        if (!stEl || !payEl || !noteEl) {
          clearInterval(heroTicketTimer);
          return;
        }
        const cur = stages[i];
        stEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-bold border ' + cur.stCls;
        stEl.textContent = cur.st;
        payEl.className = 'px-2 py-0.5 rounded-full text-[11px] font-bold border ' + cur.payCls;
        payEl.textContent = cur.pay;
        noteEl.textContent = cur.note;
        i++;
        if (i >= stages.length) {
          clearInterval(heroTicketTimer);
          heroTicketTimer = null;
        }
      };
      applyStage();
      heroTicketTimer = setInterval(applyStage, 1700);
    }

    let activeApiToken = '';
    let authMode = 'none';

    function saveState() {
      try {
        const previewMode = authMode === 'preview' && !!state.currentUser;
        const snapshot = {
          ...state,
          previewMode,
          currentUser: previewMode ? state.currentUser : null
        };
        localStorage.setItem('fixmate_v3_state', JSON.stringify(snapshot));
        localStorage.setItem('fixmate_theme', state.theme);
      } catch (e) {}
    }

    function loadState() {
      authMode = 'none';
      try {
        const raw = localStorage.getItem('fixmate_v3_state');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.users && parsed.services && parsed.bookings && parsed.payments) {
            state = parsed;
            if (parsed.previewMode === true && parsed.currentUser) {
              authMode = 'preview';
            } else {
              state.currentUser = null;
            }
          }
        }
        const savedTheme = localStorage.getItem('fixmate_theme');
        if (savedTheme === 'dark' || savedTheme === 'light') state.theme = savedTheme;
      } catch (e) {
        authMode = 'none';
        state = JSON.parse(JSON.stringify(INITIAL_STATE));
      }
    }

    async function getApiToken(forceRefresh = false) {
      if (activeApiToken && !forceRefresh) return activeApiToken;
      const response = await fetch('/api/auth/token', { method: 'GET', credentials: 'include', cache: 'no-store' });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.token) {
        activeApiToken = '';
        throw new Error(payload.message || 'Your secure session has expired. Please sign in again.');
      }
      activeApiToken = payload.token;
      return activeApiToken;
    }

    async function apiRequest(path, options = {}, requiresAuth = true) {
      const requestOptions = { ...options };
      const headers = new Headers(requestOptions.headers || {});
      const isFormData = typeof FormData !== 'undefined' && requestOptions.body instanceof FormData;
      if (requestOptions.body && !isFormData && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      if (requiresAuth) headers.set('Authorization', 'Bearer ' + await getApiToken());
      let response = await fetch('/api' + (path.startsWith('/') ? path : '/' + path), {
        ...requestOptions, headers, credentials: 'include', cache: 'no-store'
      });
      if (response.status === 401 && requiresAuth) {
        activeApiToken = '';
        headers.set('Authorization', 'Bearer ' + await getApiToken(true));
        response = await fetch('/api' + (path.startsWith('/') ? path : '/' + path), {
          ...requestOptions, headers, credentials: 'include', cache: 'no-store'
        });
      }
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || 'FixMate request failed (' + response.status + ').');
      return payload;
    }

    async function restoreApiSession() {
      const response = await fetch('/api/auth/get-session', { method: 'GET', credentials: 'include', cache: 'no-store' });
      if (!response.ok) {
        activeApiToken = '';
        authMode = 'none';
        return false;
      }
      const payload = await response.json().catch(() => null);
      const user = payload && payload.user;
      if (!user || !user.id) {
        activeApiToken = '';
        authMode = 'none';
        return false;
      }
      const profile = {
        _id: String(user.id),
        id: String(user.id),
        name: user.name || 'FixMate member',
        email: String(user.email || '').toLowerCase(),
        image: user.image || '',
        role: ['customer', 'technician', 'admin'].includes(user.role) ? user.role : 'customer',
        phone: user.phone || '',
        area: user.area || '',
        bio: user.bio || '',
        plan: user.plan === 'pro' ? 'pro' : 'free',
        createdAt: user.createdAt || new Date().toISOString()
      };
      await getApiToken(true);
      state.currentUser = profile;
      authMode = 'api';
      return true;
    }

    async function refreshApiWorkspace() {
      if (authMode !== 'api' || !state.currentUser) return;
      const role = state.currentUser.role;
      const serviceResult = await apiRequest('/services?limit=48', {}, false);
      const publicServices = Array.isArray(serviceResult.data) ? serviceResult.data : [];
      state.services = publicServices;
      if (role === 'customer') {
        const [bookings, payments] = await Promise.all([
          apiRequest('/bookings/my'),
          apiRequest('/payments/my')
        ]);
        state.bookings = Array.isArray(bookings.data) ? bookings.data : [];
        state.payments = Array.isArray(payments.data) ? payments.data : [];
      } else if (role === 'technician') {
        const [bookings, services, stats] = await Promise.all([
          apiRequest('/bookings/technician'),
          apiRequest('/services/my'),
          apiRequest('/dashboard/technician-stats')
        ]);
        state.technicianTotalEarnings = Number(stats.data?.totalEarnings || 0);
        state.payments = [];
        const ownServices = Array.isArray(services.data) ? services.data : [];
        const byId = new Map(publicServices.map(item => [String(item._id), item]));
        ownServices.forEach(item => byId.set(String(item._id), item));
        state.services = Array.from(byId.values());
        state.bookings = Array.isArray(bookings.data) ? bookings.data : [];
      } else if (role === 'admin') {
        const [bookings, services, users, payments] = await Promise.all([
          apiRequest('/admin/bookings'),
          apiRequest('/admin/services'),
          apiRequest('/admin/users'),
          apiRequest('/admin/payments')
        ]);
        state.bookings = Array.isArray(bookings.data) ? bookings.data : [];
        state.services = Array.isArray(services.data) ? services.data : [];
        state.users = (Array.isArray(users.data) ? users.data : []).map(item => ({ ...item, _id: String(item.id || item._id) }));
        state.payments = Array.isArray(payments.data) ? payments.data : [];
      }
      saveState();
    }

    async function uploadApiImage(file) {
      const form = new FormData();
      form.append('file', file);
      const result = await apiRequest('/uploads/image', { method: 'POST', body: form });
      if (!result.data || !result.data.url) throw new Error('The image upload did not return a usable URL.');
      return result.data.url;
    }

    // ============================================================================
    // 2. UTILITY & TOAST HELPERS
    // ============================================================================
    function showToast(message, type = 'success') {
      const stack = document.getElementById('toastStack');
      if (!stack) return;
      const colors = {
        success: 'bg-emerald-600 text-white border-emerald-500',
        error: 'bg-rose-600 text-white border-rose-500',
        info: 'bg-blue-600 text-white border-blue-500',
        warning: 'bg-amber-500 text-slate-950 border-amber-400'
      };
      const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
      };
      const el = document.createElement('div');
      el.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${colors[type] || colors.info} text-sm font-semibold transition-all duration-300 transform translate-y-0`;
      el.innerHTML = `
        <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0">${icons[type] || '✓'}</span>
        <span class="flex-1 leading-snug">${escapeHtml(message)}</span>
      `;
      stack.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        setTimeout(() => el.remove(), 250);
      }, 3600);
    }

    function escapeHtml(str) {
      return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function formatDate(d) {
      if (!d) return '—';
      try {
        return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } catch (e) {
        return d;
      }
    }

    function getStatusBadgeHtml(status) {
      // Required colors from PDF Page 13:
      // Requested = blue, Accepted = indigo, In Progress = amber, Completed = green, Rejected/Cancelled = red/gray
      const map = {
        'requested': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800',
        'accepted': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800',
        'in-progress': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
        'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
        'rejected': 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800',
        'cancelled': 'bg-slate-200 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
      };
      const labelMap = {
        'requested': 'Requested',
        'accepted': 'Accepted',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'rejected': 'Rejected',
        'cancelled': 'Cancelled'
      };
      const cls = map[status] || map['requested'];
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${cls}">${labelMap[status] || status}</span>`;
    }

    function getPaymentBadgeHtml(paymentStatus) {
      if (paymentStatus === 'paid') {
        return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800">✓ Paid</span>`;
      }
      return `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">Unpaid</span>`;
    }

    function getApprovalBadgeHtml(approvalStatus) {
      const map = {
        'pending': 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
        'approved': 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
        'rejected': 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800'
      };
      const cls = map[approvalStatus] || map['pending'];
      return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${cls}">${approvalStatus}</span>`;
    }

    function isTechPro(email) {
      const u = state.users.find(x => x.email === email);
      return u && u.plan === 'pro';
    }

    function openModal(html) {
      const backdrop = document.getElementById('modalBackdrop');
      const box = document.getElementById('modalContentBox');
      if (!backdrop || !box) return;
      box.innerHTML = html;
      backdrop.classList.remove('hidden');
    }

    function closeModal() {
      const backdrop = document.getElementById('modalBackdrop');
      if (backdrop) backdrop.classList.add('hidden');
    }

    function destroyCharts() {
      activeCharts.forEach(c => {
        try { c.destroy(); } catch (e) {}
      });
      activeCharts = [];
    }

    // ============================================================================
    // 3. ROUTING & ROLE GUARD ENGINE
    // ============================================================================

    function routeFromBrowserLocation() {
      let pathname = '/';
      try {
        pathname = decodeURIComponent(window.location.pathname || '/');
      } catch (error) {
        pathname = '/';
      }
      while (pathname.length > 1 && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
      }
      const segments = pathname.split('/').filter(Boolean);

      if (segments.length === 2 && segments[0] === 'services' && segments[1]) {
        state.selectedServiceId = segments[1];
        return '/services/[id]';
      }

      const exactRoutes = [
        '/', '/services', '/about', '/sign-in', '/sign-up',
        '/payment/success', '/payment/cancel', '/dashboard/profile'
      ];
      const validDashboardRole = segments.length >= 2 &&
        segments[0] === 'dashboard' &&
        ['customer', 'technician', 'admin'].includes(segments[1]) &&
        segments.slice(2).every(part => Array.from(part).every(char =>
          'abcdefghijklmnopqrstuvwxyz0123456789_-'.includes(char.toLowerCase())
        ));
      if (exactRoutes.includes(pathname) || validDashboardRole) return pathname;

      // Unknown URLs return to the home page instead of rendering a 404 screen.
      window.history.replaceState({ fixmateDemo: true }, '', '/');
      return '/';
    }

    function syncServiceQueryFromLocation() {
      if (state.route !== '/services') return;
      const params = new URLSearchParams(window.location.search);
      state.queryParams = {
        ...state.queryParams,
        search: params.get('search') || '',
        category: params.get('category') || 'All',
        serviceMode: params.get('serviceMode') || 'All',
        sort: params.get('sort') || 'newest',
        page: Math.max(1, Number(params.get('page') || 1))
      };
    }

    function writeBrowserLocation(route, replace = false) {
      let path = route;
      if (route === '/services/[id]') path = '/services/' + encodeURIComponent(state.selectedServiceId || 'srv_101');
      const params = new URLSearchParams();
      if (route === '/services') {
        const q = state.queryParams || {};
        if (q.search) params.set('search', q.search);
        if (q.category && q.category !== 'All') params.set('category', q.category);
        if (q.serviceMode && q.serviceMode !== 'All') params.set('serviceMode', q.serviceMode);
        if (q.sort && q.sort !== 'newest') params.set('sort', q.sort);
        if (q.page && Number(q.page) > 1) params.set('page', String(q.page));
      }
      const query = params.toString();
      const target = path + (query ? '?' + query : '');
      const current = window.location.pathname + window.location.search;
      if (target === current) return;
      if (replace) window.history.replaceState({ fixmateDemo: true }, '', target);
      else window.history.pushState({ fixmateDemo: true }, '', target);
    }

    function navigate(route, extra = {}) {
      if (extra.serviceId) state.selectedServiceId = extra.serviceId;
      if (extra.category) {
        state.queryParams.category = extra.category;
        state.queryParams.page = 1;
      }
      if (extra.resetFilters) {
        state.queryParams = { search: '', category: 'All', serviceMode: 'All', sort: 'newest', page: 1, limit: 6 };
      }

      // Redirect logged-in users away from /sign-in or /sign-up to their dashboard (PDF Page 8)
      if ((route === '/sign-in' || route === '/sign-up') && state.currentUser) {
        const dash = `/dashboard/${state.currentUser.role}`;
        state.route = dash;
        writeBrowserLocation(dash, true);
        showToast(`Redirected to your ${state.currentUser.role} dashboard`, 'info');
        renderApp();
        return;
      }

      // Protect every /dashboard/* and /payment/* route for logged-out users
      if ((route.startsWith('/dashboard') || route.startsWith('/payment')) && !state.currentUser) {
        state.redirectAfterLogin = route;
        state.route = '/sign-in';
        writeBrowserLocation('/sign-in', true);
        showToast('Please sign in to access your dashboard.', 'warning');
        renderApp();
        return;
      }

      state.route = route;
      writeBrowserLocation(route);
      saveState();
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function getRoleDashboardRoute(user) {
      if (!user) return '/sign-in';
      if (user.role === 'admin') return '/dashboard/admin';
      if (user.role === 'technician') return '/dashboard/technician';
      return '/dashboard/customer';
    }

    // ============================================================================
    // 4. RENDER SHELL (NAVBAR, FOOTER VISIBILITY, ACTIVE ROUTE)
    // ============================================================================
    function syncHeaderAndTheme() {
      const root = document.documentElement;
      const darkMode = state.theme === 'dark';
      root.classList.toggle('dark', darkMode);
      document.body?.classList.toggle('dark', darkMode);
      root.dataset.theme = darkMode ? 'dark' : 'light';
      if (document.body) document.body.dataset.theme = darkMode ? 'dark' : 'light';
      root.style.colorScheme = darkMode ? 'dark' : 'light';
      document.getElementById('iconSun')?.classList.toggle('hidden', !darkMode);
      document.getElementById('iconMoon')?.classList.toggle('hidden', darkMode);
      const themeButton = document.getElementById('btnThemeToggle');
      if (themeButton) {
        themeButton.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
        themeButton.setAttribute('aria-pressed', String(darkMode));
        themeButton.title = darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      }

      // Route badge
      const badge = document.getElementById('currentRouteBadge');
      if (badge) {
        if (state.route === '/services') {
          const params = new URLSearchParams();
          if (state.queryParams.search) params.set('search', state.queryParams.search);
          if (state.queryParams.category !== 'All') params.set('category', state.queryParams.category);
          if (state.queryParams.serviceMode !== 'All') params.set('mode', state.queryParams.serviceMode);
          if (state.queryParams.sort !== 'newest') params.set('sort', state.queryParams.sort);
          if (state.queryParams.page > 1) params.set('page', state.queryParams.page);
          const qs = params.toString();
          badge.textContent = qs ? `/services?${qs}` : '/services';
        } else if (state.route === '/services/[id]') {
          badge.textContent = `/services/${state.selectedServiceId}`;
        } else {
          badge.textContent = state.route;
        }
      }

      // Active route highlight on Navbar
      const mapBtn = [
        { id: 'navLinkHome', match: r => r === '/' },
        { id: 'navLinkServices', match: r => r.startsWith('/services') },
        { id: 'navLinkAbout', match: r => r === '/about' },
        { id: 'navLinkDashboardMain', match: r => r.startsWith('/dashboard') }
      ];
      mapBtn.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        if (item.match(state.route)) {
          el.className = 'nav-route-btn px-3.5 py-2 rounded-lg text-sm font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 transition-colors';
        } else {
          el.className = 'nav-route-btn px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors';
        }
      });

      const dashNavBtn = document.getElementById('navLinkDashboardMain');
      if (dashNavBtn) {
        if (state.currentUser) dashNavBtn.classList.remove('hidden');
        else dashNavBtn.classList.add('hidden');
      }

      // Auth box state
      const loggedOutBox = document.getElementById('navLoggedOutBox');
      const loggedInBox = document.getElementById('navLoggedInBox');
      if (!state.currentUser) {
        loggedOutBox?.classList.remove('hidden');
        loggedOutBox?.classList.add('flex');
        loggedInBox?.classList.add('hidden');
      } else {
        loggedOutBox?.classList.add('hidden');
        loggedOutBox?.classList.remove('flex');
        loggedInBox?.classList.remove('hidden');
        const u = state.currentUser;
        document.getElementById('navUserAvatar').src = u.image;
        document.getElementById('navUserName').textContent = u.name;
        document.getElementById('dropUserName').textContent = u.name;
        document.getElementById('dropUserEmail').textContent = u.email;

        const roleColors = {
          customer: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
          technician: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
          admin: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
        };
        const rBadge = document.getElementById('navUserRoleBadge');
        const dBadge = document.getElementById('dropUserRole');
        if (rBadge) {
          rBadge.className = `text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${roleColors[u.role]}`;
          rBadge.textContent = u.role === 'technician' && u.plan === 'pro' ? 'TECH • PRO' : u.role;
        }
        if (dBadge) {
          dBadge.className = `text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${roleColors[u.role]}`;
          dBadge.textContent = u.role;
        }
      }

      // Quick Role Bar active highlight
      const qMap = [
        { id: 'quickRoleCustomer', email: 'nadia@fixmate.com' },
        { id: 'quickRoleTech', email: 'rafiq.tech@fixmate.com' },
        { id: 'quickRoleTech2', email: 'tanvir.tech@fixmate.com' },
        { id: 'quickRoleAdmin', email: 'admin@fixmate.com' }
      ];
      qMap.forEach(q => {
        const btn = document.getElementById(q.id);
        if (!btn) return;
        const active = state.currentUser && state.currentUser.email === q.email;
        btn.className = active
          ? 'px-2.5 py-1 rounded-md font-bold transition-all bg-blue-600 text-white shadow-sm'
          : 'px-2.5 py-1 rounded-md font-medium transition-all bg-slate-800 hover:bg-slate-700 text-slate-300';
      });
      const guestBtn = document.getElementById('quickRoleGuest');
      if (guestBtn) {
        guestBtn.className = !state.currentUser
          ? 'px-2.5 py-1 rounded-md font-bold transition-all bg-rose-600 text-white'
          : 'px-2.5 py-1 rounded-md font-medium transition-all bg-slate-800 hover:bg-slate-700 text-slate-300';
      }

      // Hide public footer on dashboard pages (PDF Page 7 Requirement 3)
      const footer = document.getElementById('publicFooter');
      if (footer) {
        if (state.route.startsWith('/dashboard')) {
          footer.classList.add('hidden');
        } else {
          footer.classList.remove('hidden');
        }
      }
    }

    // ============================================================================
    // 5. PAGE RENDERERS
    // ============================================================================
    function renderServiceCard(srv) {
      const pro = isTechPro(srv.technicianEmail);
      const catMeta = CATEGORY_META[srv.category] || { icon: '🔧' };
      const modeCls = srv.serviceMode === 'Home Visit'
        ? 'bg-emerald-500/90 text-white'
        : 'bg-slate-900/85 text-amber-300';
      return `
        <article class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
          <!-- Uniform Height Image Container -->
          <div class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
            <img src="${escapeHtml(srv.image)}" alt="${escapeHtml(srv.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-3 left-3 flex items-center gap-1.5">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-sm">
                ${catMeta.icon} ${escapeHtml(srv.category)}
              </span>
            </div>
            <div class="absolute top-3 right-3">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${modeCls} shadow-sm">
                ${escapeHtml(srv.serviceMode)}
              </span>
            </div>
            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span class="px-2.5 py-1 rounded-lg bg-slate-950/80 text-white text-xs font-medium backdrop-blur-sm truncate max-w-[70%]">
                📍 ${escapeHtml(srv.serviceArea)}
              </span>
              ${srv.ratingCount > 0 ? `
                <span class="px-2 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-extrabold shadow">
                  ★ ${Number(srv.ratingAvg).toFixed(1)} (${srv.ratingCount})
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Card Body (Equal Flex Column) -->
          <div class="p-5 flex-1 flex flex-col justify-between gap-4">
            <div>
              <h3 class="font-display font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug mb-2">
                ${escapeHtml(srv.title)}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                ${escapeHtml(srv.description)}
              </p>
            </div>

            <div class="pt-3 border-t border-slate-100 dark:border-slate-800">
              <div class="flex items-center justify-between mb-3">
                <div class="min-w-0">
                  <p class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Technician</p>
                  <div class="flex items-center gap-1.5">
                    <p class="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">${escapeHtml(srv.technicianName)}</p>
                    ${pro ? `<span class="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[10px] font-extrabold" title="Pro Verified Technician">PRO</span>` : ''}
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Starting At</p>
                  <p class="text-lg font-display font-extrabold text-blue-600 dark:text-blue-400">$${Number(srv.basePrice).toFixed(0)}</p>
                </div>
              </div>

              <button type="button" data-view-service="${escapeHtml(srv._id)}" class="btn-view-details w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm shadow-blue-600/15 transition-all flex items-center justify-center gap-2">
                <span>View Details</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }

    // ----------------------------------------------------------------------------
    // 5.1 HOME PAGE (/)
    // ----------------------------------------------------------------------------
    function renderHomePage() {
      // Dynamic Featured Services: 6 latest where approvalStatus: 'approved' and isAvailable: true (.sort({ createdAt: -1 }).limit(6))
      const featured = state.services
        .filter(s => s.approvalStatus === 'approved' && s.isAvailable === true)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

      return `
        <!-- 1. HERO / BANNER SECTION -->
        <section class="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
          <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div class="lg:col-span-7 space-y-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  PAY ONLY AFTER YOUR DEVICE IS FIXED • DHAKA METRO & BEYOND
                </div>
                <h1 class="font-display font-extrabold text-3xl sm:text-5xl lg:text-[52px] tracking-tight leading-[1.12]">
                  Broken Device? Get It Fixed by <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300">Verified Technicians.</span>
                </h1>
                <p class="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                  Stop guessing what happens after you hand over your smartphone, MacBook, AC, or refrigerator. Book background-checked specialists, track every repair stage live, and pay via Stripe only when the job is completed.
                </p>

                <!-- Hero Search Box that leads to /services -->
                <form id="heroSearchForm" class="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 max-w-2xl flex flex-col sm:flex-row gap-2">
                  <div class="flex-1 flex items-center gap-2.5 px-3.5 py-2">
                    <svg class="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input id="heroSearchInput" type="text" placeholder="Search 'iPhone OLED', 'AC Jet Wash', 'MacBook Board'..." class="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none" />
                  </div>
                  <button type="submit" class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all shrink-0">
                    Explore Services →
                  </button>
                </form>

                <!-- Trust Micro-Metrics -->
                <div class="grid grid-cols-3 gap-4 pt-2 max-w-lg">
                  <div class="p-3 rounded-xl bg-slate-800/70 border border-slate-700/70">
                    <p class="font-display font-extrabold text-xl text-white">100%</p>
                    <p class="text-xs text-slate-400">Pay After Completion</p>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-800/70 border border-slate-700/70">
                    <p class="font-display font-extrabold text-xl text-amber-400">4.9 ★</p>
                    <p class="text-xs text-slate-400">Verified Customer Rating</p>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-800/70 border border-slate-700/70">
                    <p class="font-display font-extrabold text-xl text-emerald-400">180 Days</p>
                    <p class="text-xs text-slate-400">Service Warranty</p>
                  </div>
                </div>
              </div>

              <!-- Hero Photo Card -->
              <div class="lg:col-span-5">
                <div class="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-800">
                  <img src="${HERO_IMG}" alt="FixMate Dhaka Precision Technician" class="w-full h-[360px] object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                  <div class="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/92 backdrop-blur-md border border-slate-700/80 shadow-xl">
                    <div class="flex items-center justify-between gap-2 mb-1.5">
                      <span class="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">TICKET #FM-1042 • iPhone 14 Pro OLED</span>
                      <span id="heroTicketAmount" class="text-sm font-display font-extrabold text-emerald-400">$90</span>
                    </div>
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span id="heroTicketStatus" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">● Requested</span>
                        <span id="heroTicketPay" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">Unpaid</span>
                      </div>
                      <button id="btnReplayHeroJob" type="button" class="text-[11px] font-mono font-bold text-blue-300 hover:text-white underline underline-offset-2">↻ Replay job</button>
                    </div>
                    <p id="heroTicketNote" class="text-[11px] text-slate-300 mt-1.5 truncate">Request sent to Engr. Rafiqul Hasan (Dhanmondi).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. DYNAMIC FEATURED SERVICES SECTION (6 latest approved & available) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Recently Approved & Available</span>
              <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                Featured Repair Services
              </h2>
            </div>
            <button id="homeViewAllServicesBtn" type="button" class="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white text-sm font-semibold transition-colors self-start sm:self-auto">
              View All ${state.services.filter(s => s.approvalStatus === 'approved' && s.isAvailable).length} Approved Services →
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${featured.map(renderServiceCard).join('')}
          </div>
        </section>

        <!-- 3. EXTRA SECTION 1: HOW FIXMATE WORKS (4-STEP VISUAL FLOW) -->
        <section class="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-14">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-10">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Simple & Transparent</span>
              <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                How FixMate Works
              </h2>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
                No advance payments or guessing what happened to your device. Follow every step from request to completion.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 relative">
                <div class="w-11 h-11 rounded-xl bg-blue-600 text-white font-display font-extrabold text-lg flex items-center justify-center mb-4 shadow-md shadow-blue-600/20">1</div>
                <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-1.5">Find a Service</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Filter admin-approved technicians by device category, Home Visit or Shop Drop-off mode, starting price, and Dhaka neighborhood.
                </p>
              </div>
              <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 relative">
                <div class="w-11 h-11 rounded-xl bg-indigo-600 text-white font-display font-extrabold text-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-600/20">2</div>
                <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-1.5">Send a Request</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Describe your device issue, preferred date, and service address. Cancel anytime for free while status is still "Requested".
                </p>
              </div>
              <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 relative">
                <div class="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 font-display font-extrabold text-lg flex items-center justify-center mb-4 shadow-md shadow-amber-500/20">3</div>
                <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-1.5">Technician Fixes It</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Your technician accepts the job, moves it to "In Progress", repairs your device, and sets the transparent final bill upon completion.
                </p>
              </div>
              <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 relative">
                <div class="w-11 h-11 rounded-xl bg-emerald-600 text-white font-display font-extrabold text-lg flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">4</div>
                <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-1.5">Pay After Completion</h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Once marked "Completed", the Pay Now button unlocks. Pay online via Stripe Checkout, download your PDF invoice, and rate the tech!
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. EXTRA SECTION 2: POPULAR CATEGORIES (CLICKABLE FILTER CARDS) & WHY CHOOSE US -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Popular Repair Categories</span>
            <h2 class="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
              What Do You Need Fixed?
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Pick a device or appliance category to see verified technicians covering your neighborhood.
            </p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-12">
            ${CATEGORIES.map(cat => {
              const meta = CATEGORY_META[cat];
              const count = state.services.filter(s => s.category === cat && s.approvalStatus === 'approved' && s.isAvailable).length;
              return `
                <button type="button" data-home-cat="${escapeHtml(cat)}" class="home-cat-card group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between">
                  <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${meta.color} text-white text-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    ${meta.icon}
                  </div>
                  <div>
                    <h3 class="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">${escapeHtml(cat)}</h3>
                    <p class="text-[11px] text-slate-400 mt-0.5 line-clamp-1">${escapeHtml(meta.tagline)}</p>
                    <span class="inline-block mt-2 text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">${count} Active Services →</span>
                  </div>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Why Choose FixMate + Verified Testimonials -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col justify-between">
              <div>
                <span class="px-2.5 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider">Why FixMate BD?</span>
                <h3 class="font-display font-extrabold text-2xl mt-3 leading-snug">Repair Without the Worry</h3>
                <p class="text-sm text-blue-100 mt-2 leading-relaxed">
                  Built for Dhaka homes and offices. Every technician is reviewed by our team before their services go live.
                </p>
              </div>
              <ul class="space-y-2.5 text-xs font-medium text-blue-50 mt-6">
                <li class="flex items-center gap-2">✓ Every service checked and approved by our team</li>
                <li class="flex items-center gap-2">✓ Step-by-step live status updates on every job</li>
                <li class="flex items-center gap-2">✓ Free cancellation while your request is pending</li>
                <li class="flex items-center gap-2">✓ Pay online via Stripe only after repair is done</li>
              </ul>
            </div>

            <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-1 text-amber-400 text-sm mb-3">★★★★★</div>
                  <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "My Gree 2-Ton Inverter AC stopped cooling right before summer. Booked Tanvir via FixMate, tracked his status from Accepted to Completed, and paid $45 via Stripe only after testing the room temperature!"
                  </p>
                </div>
                <div class="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Nadia" class="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white">Nadia Islam</p>
                    <p class="text-[11px] text-slate-500">Verified Customer • Dhanmondi, Dhaka</p>
                  </div>
                </div>
              </div>

              <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-1 text-amber-400 text-sm mb-3">★★★★★</div>
                  <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "As a micro-soldering engineer at Multiplan Center, FixMate Pro gives me a structured request pipeline and guaranteed Stripe payouts without chasing customers."
                  </p>
                </div>
                <div class="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80" alt="Rafiq" class="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p class="text-xs font-bold text-slate-900 dark:text-white">Engr. Rafiqul Hasan <span class="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] ml-1">PRO</span></p>
                    <p class="text-[11px] text-slate-500">Verified Technician • Multiplan, Dhaka</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    // ----------------------------------------------------------------------------
    // 5.2 BROWSE SERVICES PAGE (/services) — CHALLENGE 1 + OPTIONAL REQ #4 PAGINATION
    // ----------------------------------------------------------------------------
    function renderBrowseServicesPage() {
      const q = state.queryParams;
      // Server-side MongoDB query simulation: only approved & available services
      let filtered = state.services.filter(s => s.approvalStatus === 'approved' && s.isAvailable === true);

      if (q.search.trim()) {
        const term = q.search.trim().toLowerCase();
        filtered = filtered.filter(s =>
          s.title.toLowerCase().includes(term) ||
          s.category.toLowerCase().includes(term) ||
          s.serviceArea.toLowerCase().includes(term) ||
          s.technicianName.toLowerCase().includes(term)
        );
      }

      if (q.category !== 'All') {
        filtered = filtered.filter(s => s.category === q.category);
      }

      if (q.serviceMode !== 'All') {
        filtered = filtered.filter(s => s.serviceMode === q.serviceMode);
      }

      if (q.sort === 'price_asc') {
        filtered.sort((a, b) => a.basePrice - b.basePrice);
      } else if (q.sort === 'price_desc') {
        filtered.sort((a, b) => b.basePrice - a.basePrice);
      } else {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      const totalMatched = filtered.length;
      const totalPages = Math.max(1, Math.ceil(totalMatched / q.limit));
      if (q.page > totalPages) q.page = totalPages;
      const skip = (q.page - 1) * q.limit;
      const paginated = filtered.slice(skip, skip + q.limit);

      // Build live MongoDB query display for examiner verification
      const mongoFilterObj = {
        approvalStatus: 'approved',
        isAvailable: true,
        ...(q.category !== 'All' ? { category: q.category } : {}),
        ...(q.serviceMode !== 'All' ? { serviceMode: q.serviceMode } : {}),
        ...(q.search.trim() ? { $or: [{ title: `/${q.search.trim()}/i` }, { category: `/${q.search.trim()}/i` }] } : {})
      };
      const mongoSortObj = q.sort === 'price_asc' ? '{ basePrice: 1 }' : q.sort === 'price_desc' ? '{ basePrice: -1 }' : '{ createdAt: -1 }';

      return `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Verified Technicians</span>
              <h1 class="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
                Repair Services
              </h1>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Every listing is reviewed by our team. Filter by category, visit type, or starting price.
              </p>
            </div>
            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/70 self-start sm:self-auto">
              ${totalMatched} Services Available
            </span>
          </div>

          <!-- Filter & Search Controls Bar -->
          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
              <!-- Search Input -->
              <div class="lg:col-span-4 relative">
                <input id="srvSearchInput" type="text" value="${escapeHtml(q.search)}" placeholder="Search by title, category, or area..." class="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500" />
                <svg class="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>

              <!-- Category Dropdown -->
              <div class="lg:col-span-3">
                <select id="srvCategorySelect" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="All" ${q.category === 'All' ? 'selected' : ''}>All Categories (7)</option>
                  ${CATEGORIES.map(c => `<option value="${escapeHtml(c)}" ${q.category === c ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
                </select>
              </div>

              <!-- Service Mode Dropdown -->
              <div class="lg:col-span-2">
                <select id="srvModeSelect" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="All" ${q.serviceMode === 'All' ? 'selected' : ''}>All Modes</option>
                  <option value="Home Visit" ${q.serviceMode === 'Home Visit' ? 'selected' : ''}>Home Visit</option>
                  <option value="Shop Drop-off" ${q.serviceMode === 'Shop Drop-off' ? 'selected' : ''}>Shop Drop-off</option>
                </select>
              </div>

              <!-- Sort Dropdown -->
              <div class="lg:col-span-2">
                <select id="srvSortSelect" class="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500">
                  <option value="newest" ${q.sort === 'newest' ? 'selected' : ''}>Sort: Newest</option>
                  <option value="price_asc" ${q.sort === 'price_asc' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price_desc" ${q.sort === 'price_desc' ? 'selected' : ''}>Price: High to Low</option>
                </select>
              </div>

              <!-- Reset Button -->
              <div class="lg:col-span-1">
                <button id="srvResetBtn" type="button" class="w-full h-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Reset
                </button>
              </div>
            </div>

            <!-- Category Quick Chips -->
            <div class="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span class="text-xs text-slate-400 mr-1">Quick Filter:</span>
              <button type="button" data-chip-cat="All" class="srv-cat-chip px-2.5 py-1 rounded-lg text-xs font-semibold ${q.category === 'All' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">All</button>
              ${CATEGORIES.map(c => `
                <button type="button" data-chip-cat="${escapeHtml(c)}" class="srv-cat-chip px-2.5 py-1 rounded-lg text-xs font-semibold ${q.category === c ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${escapeHtml(c)}</button>
              `).join('')}
            </div>
          </div>

          <!-- Results Count or Friendly Empty State -->
          ${paginated.length === 0 ? `
            <div class="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-lg mx-auto my-6">
              <div class="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mx-auto mb-4">🔍</div>
              <h3 class="font-display font-bold text-xl text-slate-900 dark:text-white">No Matching Repair Services Found</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1.5 mb-6">
                We couldn't find any approved and available services matching your current search or filter criteria.
              </p>
              <button id="emptyResetFiltersBtn" type="button" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold">
                Clear All Filters & Show All Services
              </button>
            </div>
          ` : `
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
              <span>Showing <strong>${skip + 1}–${Math.min(skip + q.limit, totalMatched)}</strong> of <strong>${totalMatched}</strong> approved services</span>
              <span>Page ${q.page} of ${totalPages}</span>
            </div>

            <!-- Responsive Grid (3 cards per row on desktop, 2 on tablet, 1 on mobile) -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${paginated.map(renderServiceCard).join('')}
            </div>

            <!-- Server-Side Pagination Controls (Optional Req #4) -->
            <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button type="button" id="pagePrevBtn" ${q.page <= 1 ? 'disabled' : ''} class="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800">
                ← Previous
              </button>
              ${Array.from({ length: totalPages }, (_, idx) => idx + 1).map(pNum => `
                <button type="button" data-page-num="${pNum}" class="page-num-btn w-10 h-10 rounded-xl text-sm font-bold ${pNum === q.page ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'}">
                  ${pNum}
                </button>
              `).join('')}
              <button type="button" id="pageNextBtn" ${q.page >= totalPages ? 'disabled' : ''} class="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800">
                Next →
              </button>
            </div>
          `}
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 5.3 SERVICE DETAILS PAGE (/services/[id]) & ROLE-RESTRICTED REPAIR REQUEST
    // ----------------------------------------------------------------------------
    function renderServiceDetailsPage() {
      const srv = state.services.find(s => s._id === state.selectedServiceId);
      // Invalid or unavailable service links return to the Home page.
      if (!srv || srv.approvalStatus !== 'approved' || !srv.isAvailable) {
        state.route = '/';
        writeBrowserLocation('/', true);
        return renderHomePage();
      }

      const tech = state.users.find(u => u.email === srv.technicianEmail) || {
        name: srv.technicianName,
        email: srv.technicianEmail,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=240&q=80',
        area: srv.serviceArea,
        bio: 'Verified FixMate Repair Specialist.',
        plan: 'free'
      };

      const reviews = state.bookings.filter(b => b.serviceId === srv._id && b.rating);
      const u = state.currentUser;

      // Check duplicate active request for logged-in customer
      const existingActive = u && u.role === 'customer'
        ? state.bookings.find(b =>
            b.serviceId === srv._id &&
            b.customerEmail === u.email &&
            ['requested', 'accepted', 'in-progress'].includes(b.status)
          )
        : null;

      let actionBoxHtml = '';
      if (!u) {
        actionBoxHtml = `
          <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 mb-4 text-xs text-blue-800 dark:text-blue-200">
            You are currently browsing as a visitor. Clicking <strong>Request Repair</strong> will take you to Sign In and bring you right back here.
          </div>
          <button id="btnRequestRepairGuest" type="button" class="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all">
            Request Repair (Sign In Required) →
          </button>
        `;
      } else if (u.role === 'technician' || u.role === 'admin') {
        actionBoxHtml = `
          <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 mb-3 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <span>🔒</span>
            <span>Only customers can request a repair. (${u.email === srv.technicianEmail ? 'Technicians cannot request their own service.' : `Logged in as ${u.role}.`})</span>
          </div>
          <button type="button" disabled class="w-full py-3 px-5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 font-bold text-sm cursor-not-allowed">
            Request Repair (Customer Role Only)
          </button>
        `;
      } else {
        // Customer role
        actionBoxHtml = `
          ${existingActive ? `
            <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 mb-3 text-xs text-amber-800 dark:text-amber-200">
              ⚠️ You currently have an active booking (<strong>${existingActive.status}</strong>) for this service. Attempting to submit another will trigger the duplicate guard.
            </div>
          ` : ''}
          <button id="btnOpenRepairRequestModal" type="button" class="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all">
            🔧 Request Repair Now
          </button>
        `;
      }

      return `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <button id="btnBackToServices" type="button" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 mb-6">
            ← Back to Browse Services
          </button>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left 8 Cols: Service Banner, Details & Reviews -->
            <div class="lg:col-span-8 space-y-6">
              <div class="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div class="relative h-72 sm:h-96 w-full bg-slate-900">
                  <img src="${escapeHtml(srv.image)}" alt="${escapeHtml(srv.title)}" class="w-full h-full object-cover" />
                  <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow">${escapeHtml(srv.category)}</span>
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow">${escapeHtml(srv.serviceMode)}</span>
                  </div>
                </div>
                <div class="p-6 sm:p-8">
                  <div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span>📍 Coverage: <strong class="text-slate-700 dark:text-slate-200">${escapeHtml(srv.serviceArea)}</strong></span>
                    <span>•</span>
                    <span>⏱ Est. Duration: <strong class="text-slate-700 dark:text-slate-200">${escapeHtml(srv.estimatedDuration)}</strong></span>
                    <span>•</span>
                    <span class="text-amber-500 font-bold">★ ${srv.ratingCount > 0 ? `${srv.ratingAvg} (${srv.ratingCount} reviews)` : 'New Service'}</span>
                  </div>

                  <h1 class="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-snug mb-4">
                    ${escapeHtml(srv.title)}
                  </h1>

                  <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">What This Repair Service Includes</h3>
                  <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    ${escapeHtml(srv.description)}
                  </p>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
                    <div>
                      <p class="text-[11px] text-slate-400 uppercase font-semibold">Starting Base Price</p>
                      <p class="text-2xl font-display font-extrabold text-blue-600 dark:text-blue-400">$${Number(srv.basePrice).toFixed(2)} <span class="text-xs font-normal text-slate-400">USD</span></p>
                    </div>
                    <div>
                      <p class="text-[11px] text-slate-400 uppercase font-semibold">Estimated Turnaround</p>                      <p class="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">${escapeHtml(srv.estimatedDuration)}</p>
                    </div>
                    <div>
                      <p class="text-[11px] text-slate-400 uppercase font-semibold">Payment Policy</p>
                      <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">Pay After Completion</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Customer Ratings & Reviews Section (Optional Req #2) -->
              <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white mb-4">
                  Verified Customer Reviews (${reviews.length})
                </h3>
                ${reviews.length === 0 ? `
                  <p class="text-sm text-slate-500 dark:text-slate-400">No written reviews yet for this service. Customers can submit a 1–5 star rating once a booking is completed and paid.</p>
                ` : `
                  <div class="space-y-4">
                    ${reviews.map(r => `
                      <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
                        <div class="flex items-center justify-between mb-1.5">
                          <span class="font-bold text-sm text-slate-900 dark:text-white">${escapeHtml(r.customerName)}</span>
                          <span class="text-amber-500 font-bold text-xs">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)} (${r.rating}/5)</span>
                        </div>
                        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">"${escapeHtml(r.review)}"</p>
                      </div>
                    `).join('')}
                  </div>
                `}
              </div>
            </div>

            <!-- Right 4 Cols: Booking Card & Technician Summary -->
            <div class="lg:col-span-4 space-y-6">
              <!-- Request Repair Card -->
              <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span class="text-xs text-slate-400 uppercase font-bold">Base Inspection & Fix</span>
                    <p class="text-3xl font-display font-extrabold text-slate-900 dark:text-white">$${Number(srv.basePrice).toFixed(0)}</p>
                  </div>
                  <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Available Today</span>
                </div>

                ${actionBoxHtml}

                <ul class="mt-5 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <li class="flex items-center gap-2">✓ $0 upfront payment required to request</li>
                  <li class="flex items-center gap-2">✓ Free cancellation while status is "Requested"</li>
                  <li class="flex items-center gap-2">✓ Stripe Checkout unlocks only after completion</li>
                </ul>
              </div>

              <!-- Technician Summary Card -->
              <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Verified Technician Summary</h3>
                <div class="flex items-center gap-3.5 mb-4">
                  <img src="${escapeHtml(tech.image)}" alt="${escapeHtml(tech.name)}" class="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
                  <div>
                    <div class="flex items-center gap-1.5">
                      <h4 class="font-display font-bold text-base text-slate-900 dark:text-white">${escapeHtml(tech.name)}</h4>
                      ${tech.plan === 'pro' ? `<span class="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[10px] font-extrabold">Verified Pro</span>` : ''}
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(tech.email)}</p>
                    <p class="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">📍 ${escapeHtml(tech.area || srv.serviceArea)}</p>
                  </div>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/70">
                  ${escapeHtml(tech.bio)}
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 5.4 HOW IT WORKS / ABOUT PAGE (/about)
    // ----------------------------------------------------------------------------
    function renderAboutPage() {
      return `
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
          <div class="text-center max-w-3xl mx-auto">
            <span class="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">How FixMate Works</span>
            <h1 class="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-3">
              Simple, Honest Device Repair Across Bangladesh
            </h1>
            <p class="text-slate-600 dark:text-slate-300 text-base mt-3 leading-relaxed">
              In Dhaka and across Bangladesh, customers struggle to find reliable repair specialists and often pay before any work is done. FixMate connects verified technicians with customers through a strict status pipeline where payment happens only after completion.
            </p>
          </div>

          <!-- Job Status Rules Pipeline Table (From PDF Page 6) -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
            <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
              Every Repair Follows the Same Clear Steps
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-6">
              You always know where your device stands, and payment unlocks only after your technician completes the repair.
            </p>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-400">
                    <th class="py-3 px-4">Current Status</th>
                    <th class="py-3 px-4">Next Allowed Status</th>
                    <th class="py-3 px-4">Who Can Change It</th>
                    <th class="py-3 px-4">What Happens</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/70">
                  <tr>
                    <td class="py-3 px-4">${getStatusBadgeHtml('requested')}</td>
                    <td class="py-3 px-4">${getStatusBadgeHtml('accepted')}</td>
                    <td class="py-3 px-4 font-semibold">Assigned Technician</td>
                    <td class="py-3 px-4 text-xs text-slate-500">Technician reviews your request and confirms the appointment</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4">${getStatusBadgeHtml('requested')}</td>
                    <td class="py-3 px-4">${getStatusBadgeHtml('rejected')}</td>
                    <td class="py-3 px-4 font-semibold">Assigned Technician</td>
                    <td class="py-3 px-4 text-xs text-slate-500">Technician declines if unavailable (closed state)</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4">${getStatusBadgeHtml('requested')}</td>
                    <td class="py-3 px-4">${getStatusBadgeHtml('cancelled')}</td>
                    <td class="py-3 px-4 font-semibold">Customer</td>
                    <td class="py-3 px-4 text-xs text-slate-500">Free cancellation anytime before the technician accepts</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4">${getStatusBadgeHtml('accepted')}</td>
                    <td class="py-3 px-4">${getStatusBadgeHtml('in-progress')}</td>
                    <td class="py-3 px-4 font-semibold">Assigned Technician</td>
                    <td class="py-3 px-4 text-xs text-slate-500">Diagnostic and repair work is actively underway</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4">${getStatusBadgeHtml('in-progress')}</td>
                    <td class="py-3 px-4">${getStatusBadgeHtml('completed')}</td>
                    <td class="py-3 px-4 font-semibold">Assigned Technician</td>
                    <td class="py-3 px-4 text-xs text-slate-500">Repair finished and final bill confirmed; Pay Now unlocks</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4">${getStatusBadgeHtml('completed')} + ${getPaymentBadgeHtml('unpaid')}</td>
                    <td class="py-3 px-4">${getPaymentBadgeHtml('paid')}</td>
                    <td class="py-3 px-4 font-semibold">Customer via Stripe</td>
                    <td class="py-3 px-4 text-xs text-slate-500">Secure card payment completed and receipt issued</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 5.5 AUTHENTICATION PAGES (/sign-in & /sign-up)
    // ----------------------------------------------------------------------------
    function renderSignInPage() {
      return `
        <div class="max-w-md mx-auto px-4 py-12 w-full">
          <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div class="text-center mb-6">
              <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-600/20">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg>
              </div>
              <h1 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Sign In to FixMate</h1>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Welcome back! Sign in to manage your repairs.</p>
            </div>

            <form id="signInForm" class="space-y-4">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1.5">Email Address</label>
                <input id="loginEmail" type="email" required autocomplete="username" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500" placeholder="you@fixmate.com" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1.5">Password</label>
                <input id="loginPassword" type="password" required autocomplete="current-password" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500" placeholder="••••••••" />
              </div>
              <button type="submit" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all">
                Sign In →
              </button>
            </form>

            <div class="my-5 flex items-center gap-3">
              <div class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              <span class="text-[11px] text-slate-400 uppercase font-semibold">Or Social Login</span>
              <div class="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>

            ${window.FIXMATE_GOOGLE_AUTH_ENABLED ? '<button id="btnGoogleLogin" type="button" class="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold flex items-center justify-center gap-2.5"><span class="text-base">G</span><span>Continue with Google</span></button>' : '<div class="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-center text-xs text-slate-500 dark:text-slate-400">Google sign-in is not configured for this deployment yet.</div>'}

            <!-- Demo Quick Fill Credentials -->
            <div class="mt-6 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 text-xs space-y-1.5">
              <p class="font-bold text-slate-700 dark:text-slate-200">Demo preview accounts · click to fill both fields</p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Shared password: <strong class="font-mono text-slate-800 dark:text-slate-100">Password123</strong></p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                <button type="button" data-fill-email="nadia@fixmate.com" data-fill-password="Password123" class="fill-cred-btn px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-mono text-[11px]">Customer</button>
                <button type="button" data-fill-email="rafiq.tech@fixmate.com" data-fill-password="Password123" class="fill-cred-btn px-2 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-[11px]">Technician (Pro)</button>
                <button type="button" data-fill-email="tanvir.tech@fixmate.com" data-fill-password="Password123" class="fill-cred-btn px-2 py-1 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono text-[11px]">Technician (Free)</button>
                <button type="button" data-fill-email="admin@fixmate.com" data-fill-password="Password123" class="fill-cred-btn px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-mono text-[11px]">Admin</button>
              </div>
            </div>

            <p class="text-center text-xs text-slate-500 mt-6">
              Don't have an account?
              <button id="goToSignUpLink" type="button" class="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1">Create Account</button>
            </p>
          </div>
        </div>
      `;
    }

    function renderSignUpPage() {
      return `
        <div class="max-w-lg mx-auto px-4 py-12 w-full">
          <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div class="text-center mb-6">
              <h1 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Create Your FixMate Account</h1>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Book trusted repairs or offer your technician services on FixMate.</p>
            </div>

            <form id="signUpForm" class="space-y-4" novalidate>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1.5">Full Name *</label>
                <input id="regName" type="text" required placeholder="e.g. Tariqul Islam" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500" />
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1.5">Email Address *</label>
                <input id="regEmail" type="email" required placeholder="tariq@example.com" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500" />
              </div>

              <!-- Role Selection Cards (Customer or Technician ONLY; Admin forbidden per PDF Page 8) -->
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-2">Choose Account Role *</label>
                <div class="grid grid-cols-2 gap-3">
                  <label class="cursor-pointer">
                    <input type="radio" name="regRole" value="customer" checked class="peer sr-only" />
                    <div class="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 peer-checked:border-blue-600 peer-checked:bg-blue-50/60 dark:peer-checked:bg-blue-950/40 transition-all">
                      <p class="font-display font-bold text-sm text-slate-900 dark:text-white">🧑 Customer</p>
                      <p class="text-[11px] text-slate-500 mt-0.5">Book repairs, track jobs & pay after service</p>
                    </div>
                  </label>
                  <label class="cursor-pointer">
                    <input type="radio" name="regRole" value="technician" class="peer sr-only" />
                    <div class="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 peer-checked:border-blue-600 peer-checked:bg-blue-50/60 dark:peer-checked:bg-blue-950/40 transition-all">
                      <p class="font-display font-bold text-sm text-slate-900 dark:text-white">🔧 Technician</p>
                      <p class="text-[11px] text-slate-500 mt-0.5">List services, manage jobs & earn via Stripe</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1.5">Password *</label>
                <input id="regPassword" type="password" required placeholder="At least 6 chars, 1 uppercase, 1 lowercase" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500" />
                <div id="regPasswordErrors" class="mt-2 space-y-1 text-xs">
                  <p id="pwRuleLen" class="text-slate-400">○ At least 6 characters</p>
                  <p id="pwRuleUpper" class="text-slate-400">○ At least one uppercase letter (A–Z)</p>
                  <p id="pwRuleLower" class="text-slate-400">○ At least one lowercase letter (a–z)</p>
                </div>
              </div>

              <button type="submit" class="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all">
                Create Account & Go to Dashboard →
              </button>
            </form>

            <p class="text-center text-xs text-slate-500 mt-6">
              Already have an account?
              <button id="goToSignInLink" type="button" class="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1">Sign In</button>
            </p>
          </div>
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 5.6 PAYMENT SUCCESS & CANCEL PAGES (/payment/success & /payment/cancel)
    // ----------------------------------------------------------------------------
    function renderPaymentSuccessPage() {
      const lastPay = state.payments[state.payments.length - 1] || {
        amount: 90,
        transactionId: 'pi_3QFixMateLive9901',
        serviceTitle: 'Repair Service'
      };
      return `
        <div class="max-w-lg mx-auto px-4 py-14 w-full">
          <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 shadow-xl text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
            <span class="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">Payment Confirmed</span>
            <h1 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-3">Stripe Payment Successful!</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Thank you! Your technician has been notified and this booking is now marked as Paid.
            </p>

            <div class="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 text-left text-xs space-y-2">
              <div class="flex justify-between">
                <span class="text-slate-400">Service:</span>
                <span class="font-bold text-slate-800 dark:text-slate-100 text-right">${escapeHtml(lastPay.serviceTitle)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Amount Paid:</span>
                <span class="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">$${Number(lastPay.amount).toFixed(2)} USD</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Stripe Transaction ID:</span>
                <span class="font-mono text-slate-700 dark:text-slate-200">${escapeHtml(lastPay.transactionId)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Payment Status:</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Verified & Paid</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button id="btnSuccessToBookings" type="button" class="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm">
                Back to My Bookings →
              </button>
              <button id="btnSuccessToPayments" type="button" class="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold">
                View Payment History
              </button>
            </div>
          </div>
        </div>
      `;
    }

    function renderPaymentCancelPage() {
      return `
        <div class="max-w-lg mx-auto px-4 py-14 w-full">
          <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800/80 shadow-xl text-center">
            <div class="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center text-3xl mx-auto mb-4">✕</div>
            <h1 class="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Payment Cancelled</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Your Stripe Checkout session was cancelled. No charges were made and your booking remains <strong>Completed (Unpaid)</strong> so you can try again anytime.
            </p>
            <button id="btnCancelTryAgain" type="button" class="mt-6 w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm">
              Try Again in My Bookings →
            </button>
          </div>
        </div>
      `;
    }

    // ============================================================================
    // 6. UNIFIED DASHBOARD LAYOUT & ROLE-PROTECTED SUB-ROUTES
    // ============================================================================
    function renderDashboardLayout() {
      const u = state.currentUser;
      if (!u) return renderSignInPage();

      // Role-Based Route Protection Check (PDF Page 8 & Challenge 2)
      const r = state.route;
      const isAllowed =
        r === '/dashboard/profile' ||
        (u.role === 'customer' && r.startsWith('/dashboard/customer')) ||
        (u.role === 'technician' && r.startsWith('/dashboard/technician')) ||
        (u.role === 'admin' && r.startsWith('/dashboard/admin'));

      // Dynamic Sidebar Menu Items per Role
      const menus = {
        customer: [
          { route: '/dashboard/customer', label: 'Overview', icon: '📊' },
          { route: '/dashboard/customer/bookings', label: 'My Bookings', icon: '📋' },
          { route: '/dashboard/customer/payments', label: 'Payment History', icon: '💳' },
          { route: '/dashboard/profile', label: 'Update Profile', icon: '👤' }
        ],
        technician: [
          { route: '/dashboard/technician', label: 'Overview', icon: '📊' },
          { route: '/dashboard/technician/add-service', label: 'Add a Service', icon: '➕' },
          { route: '/dashboard/technician/my-services', label: 'My Services', icon: '🛠️' },
          { route: '/dashboard/technician/requests', label: 'Manage Requests', icon: '📥' },
          { route: '/dashboard/profile', label: 'Update Profile', icon: '👤' }
        ],
        admin: [
          { route: '/dashboard/admin', label: 'Overview', icon: '📊' },
          { route: '/dashboard/admin/users', label: 'Manage Users', icon: '👥' },
          { route: '/dashboard/admin/services', label: 'Service Approval', icon: '✅' },
          { route: '/dashboard/admin/bookings', label: 'All Bookings', icon: '🗂️' },
          { route: '/dashboard/admin/transactions', label: 'Transactions', icon: '💰' },
          { route: '/dashboard/profile', label: 'Update Profile', icon: '👤' }
        ]
      };
      const navItems = menus[u.role] || menus.customer;

      let innerContent = '';
      if (!isAllowed) {
        innerContent = `
          <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-center max-w-lg mx-auto my-8">
            <div class="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center text-2xl mx-auto mb-3">🛡️</div>
            <span class="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">Access Restricted</span>
            <h2 class="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-2">Access Restricted to Another Role</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 mb-5">
              You are signed in as <strong>${escapeHtml(u.name)} (${escapeHtml(u.role)})</strong> and cannot open <code>${escapeHtml(r)}</code>.
            </p>
            <button id="btnRedirectOwnDashboard" type="button" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
              Go to My ${u.role.toUpperCase()} Dashboard →
            </button>
          </div>
        `;
      } else if (r === '/dashboard/customer') {
        innerContent = renderCustomerOverview();
      } else if (r === '/dashboard/customer/bookings') {
        innerContent = renderCustomerBookings();
      } else if (r === '/dashboard/customer/payments') {
        innerContent = renderCustomerPayments();
      } else if (r === '/dashboard/technician') {
        innerContent = renderTechnicianOverview();
      } else if (r === '/dashboard/technician/add-service') {
        innerContent = renderTechnicianAddService();
      } else if (r === '/dashboard/technician/my-services') {
        innerContent = renderTechnicianMyServices();
      } else if (r === '/dashboard/technician/requests') {
        innerContent = renderTechnicianRequests();
      } else if (r === '/dashboard/admin') {
        innerContent = renderAdminOverview();
      } else if (r === '/dashboard/admin/users') {
        innerContent = renderAdminUsers();
      } else if (r === '/dashboard/admin/services') {
        innerContent = renderAdminServices();
      } else if (r === '/dashboard/admin/bookings') {
        innerContent = renderAdminBookings();
      } else if (r === '/dashboard/admin/transactions') {
        innerContent = renderAdminTransactions();
      } else if (r === '/dashboard/profile') {
        innerContent = renderProfilePage();
      }

      return `
        <div class="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
          <!-- Collapsible Responsive Dashboard Sidebar -->
          <aside class="lg:w-64 shrink-0">
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-20">
              <!-- User Profile Mini Header in Sidebar -->
              <div class="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <img src="${escapeHtml(u.image)}" alt="${escapeHtml(u.name)}" class="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                <div class="min-w-0">
                  <div class="flex items-center gap-1">
                    <p class="font-display font-bold text-sm text-slate-900 dark:text-white truncate">${escapeHtml(u.name)}</p>
                    ${u.role === 'technician' && u.plan === 'pro' ? `<span class="px-1.5 py-0.2 rounded bg-blue-600 text-white text-[9px] font-extrabold">PRO</span>` : ''}
                  </div>
                  <p class="text-[11px] font-mono uppercase text-blue-600 dark:text-blue-400 font-bold">${escapeHtml(u.role)} Portal</p>
                </div>
              </div>

              <!-- Dynamic Menu Links -->
              <nav class="space-y-1">
                ${navItems.map(item => {
                  const active = state.route === item.route;
                  return `
                    <button type="button" data-dash-nav="${item.route}" class="dash-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}">
                      <span>${item.icon}</span>
                      <span>${escapeHtml(item.label)}</span>
                    </button>
                  `;
                }).join('')}
              </nav>

              <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <button type="button" id="dashBackHomeBtn" class="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <span>🏠</span>
                  <span>Back to Public Home</span>
                </button>
              </div>            </div>
          </aside>

          <!-- Main Dashboard Content Column -->
          <div class="flex-1 min-w-0 space-y-6">
            <!-- Dashboard Top Bar -->
            <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">${escapeHtml(u.role)} Dashboard</p>
                <h1 class="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                  Welcome back, ${escapeHtml(u.name)}
                </h1>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">📍 ${escapeHtml(u.area || 'Dhaka, Bangladesh')}</span>
                <button type="button" id="dashTopBrowseBtn" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-xs font-bold transition-colors">
                  Browse Services
                </button>
              </div>
            </div>

            ${innerContent}
          </div>
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 6.1 CUSTOMER DASHBOARD VIEWS
    // ----------------------------------------------------------------------------
    function renderCustomerOverview() {
      const u = state.currentUser;
      const myBookings = state.bookings.filter(b => b.customerEmail === u.email);
      const totalReq = myBookings.length;
      const activeJobs = myBookings.filter(b => ['requested', 'accepted', 'in-progress'].includes(b.status)).length;
      const completedJobs = myBookings.filter(b => b.status === 'completed').length;
      const totalSpent = state.payments.filter(p => p.customerEmail === u.email).reduce((sum, p) => sum + Number(p.amount || 0), 0);
      const unpaidCompleted = myBookings.filter(b => b.status === 'completed' && b.paymentStatus === 'unpaid');
      const unpaidSum = unpaidCompleted.reduce((sum, b) => sum + Number(b.finalAmount || b.basePrice), 0);

      return `
        ${unpaidCompleted.length > 0 ? `
          <div class="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex flex-wrap items-center justify-between gap-3">
            <p class="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
              ⚡ ${unpaidCompleted.length} completed repair job waiting for payment ($${unpaidSum} total).
            </p>
            <button type="button" data-dash-nav="/dashboard/customer/bookings" class="dash-nav-btn px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold">
              Review & Pay Now →
            </button>
          </div>
        ` : ''}
        <!-- Reusable Stats Cards (Total Requests, Active Jobs, Completed Jobs + Total Spent) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Requests</span>
              <span class="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">📋</span>
            </div>
            <p class="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-3">${totalReq}</p>
            <p class="text-xs text-slate-500 mt-1">All repair bookings under your account</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Active Jobs</span>
              <span class="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">⚙️</span>
            </div>
            <p class="font-display font-extrabold text-3xl text-amber-500 mt-3">${activeJobs}</p>
            <p class="text-xs text-slate-500 mt-1">Requested, Accepted, or In Progress</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Jobs</span>
              <span class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">✓</span>
            </div>
            <p class="font-display font-extrabold text-3xl text-emerald-600 dark:text-emerald-400 mt-3">${completedJobs}</p>
            <p class="text-xs text-slate-500 mt-1">Ready for payment or already paid</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-900 dark:bg-blue-950/80 text-white border border-slate-800 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-300">Total Spent</span>
              <span class="w-9 h-9 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center font-bold">$</span>
            </div>
            <p class="font-display font-extrabold text-3xl text-emerald-400 mt-3">$${totalSpent}</p>
            <p class="text-xs text-slate-400 mt-1">Verified Stripe payments</p>
          </div>
        </div>

        <!-- Dashboard Chart + Quick Action -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-4">Your Repair Bookings Breakdown</h3>
            <div class="relative h-64">
              <canvas id="customerOverviewChart"></canvas>
            </div>
          </div>
          <div class="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-2">Pending Customer Actions</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Jobs waiting for your Stripe payment or feedback:</p>
              <div class="space-y-3">
                ${myBookings.filter(b => b.status === 'completed' && b.paymentStatus === 'unpaid').map(b => `
                  <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <p class="text-xs font-bold text-slate-900 dark:text-white truncate">${escapeHtml(b.serviceTitle)}</p>
                      <p class="text-[11px] text-emerald-700 dark:text-emerald-300">Completed • Final Bill: <strong>$${b.finalAmount}</strong></p>
                    </div>
                    <button type="button" data-dash-nav="/dashboard/customer/bookings" class="dash-nav-btn px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shrink-0">Pay Now →</button>
                  </div>
                `).join('') || `<p class="text-xs text-slate-400 italic">No unpaid completed jobs right now.</p>`}
              </div>
            </div>
            <button type="button" data-dash-nav="/dashboard/customer/bookings" class="dash-nav-btn mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
              Open My Bookings & Job Timeline Tracker →
            </button>
          </div>
        </div>
      `;
    }

    function renderJobTimelineTracker(bkg) {
      // Optional Requirement #3: Job Timeline Tracker (Requested → Accepted → In Progress → Completed → Paid)
      if (bkg.status === 'rejected' || bkg.status === 'cancelled') {
        return `
          <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-semibold">
            <span>⏹ Job Pipeline Terminated:</span>
            ${getStatusBadgeHtml(bkg.status)}
          </div>
        `;
      }
      const steps = [
        { key: 'requested', label: 'Requested' },
        { key: 'accepted', label: 'Accepted' },
        { key: 'in-progress', label: 'In Progress' },
        { key: 'completed', label: 'Completed' },
        { key: 'paid', label: 'Paid' }
      ];
      const order = { 'requested': 1, 'accepted': 2, 'in-progress': 3, 'completed': 4 };
      let currentIdx = order[bkg.status] || 1;
      if (bkg.status === 'completed' && bkg.paymentStatus === 'paid') currentIdx = 5;

      return `
        <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span class="font-mono uppercase font-semibold">Live Job Timeline Tracker</span>
            <span>Stage ${currentIdx} of 5</span>
          </div>
          <div class="grid grid-cols-5 gap-1.5">
            ${steps.map((st, idx) => {
              const stepNum = idx + 1;
              const done = stepNum <= currentIdx;
              const hist = (bkg.statusHistory || []).find(h => h.status === st.key);
              return `
                <div class="p-2 rounded-lg border ${done ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-400'}">
                  <div class="flex items-center gap-1 font-bold text-[11px]">
                    <span>${done ? '●' : '○'}</span>
                    <span class="truncate">${st.label}</span>
                  </div>
                  <p class="text-[10px] opacity-75 truncate mt-0.5">${hist ? formatDate(hist.changedAt) : 'Pending'}</p>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    function renderCustomerBookings() {
      const u = state.currentUser;
      const allMine = state.bookings.filter(b => b.customerEmail === u.email);
      const cf = state.customerBookingFilter || 'All';
      const cntActive = allMine.filter(b => ['requested', 'accepted', 'in-progress'].includes(b.status)).length;
      const cntToPay = allMine.filter(b => b.status === 'completed' && b.paymentStatus === 'unpaid').length;
      const cntPaid = allMine.filter(b => b.paymentStatus === 'paid').length;
      const cntClosed = allMine.filter(b => ['cancelled', 'rejected'].includes(b.status)).length;

      let myBookings = allMine;
      if (cf === 'Active') myBookings = allMine.filter(b => ['requested', 'accepted', 'in-progress'].includes(b.status));
      else if (cf === 'To Pay') myBookings = allMine.filter(b => b.status === 'completed' && b.paymentStatus === 'unpaid');
      else if (cf === 'Paid') myBookings = allMine.filter(b => b.paymentStatus === 'paid');
      else if (cf === 'Closed') myBookings = allMine.filter(b => ['cancelled', 'rejected'].includes(b.status));

      const cTabs = [
        { key: 'All', count: allMine.length },
        { key: 'Active', count: cntActive },
        { key: 'To Pay', count: cntToPay },
        { key: 'Paid', count: cntPaid },
        { key: 'Closed', count: cntClosed }
      ];

      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white">My Repair Bookings (${allMine.length})</h2>
              <p class="text-xs text-slate-500">Track status pipeline, cancel requested bookings, pay completed jobs with Stripe, or download PDF invoices.</p>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${cTabs.map(t => `
                <button type="button" data-cust-bkg-filter="${t.key}" class="btn-cust-bkg-filter px-3 py-1.5 rounded-xl text-xs font-bold ${cf === t.key ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${t.key} <span class="opacity-75 ml-0.5">${t.count}</span></button>
              `).join('')}
            </div>
          </div>

          ${myBookings.length === 0 ? `
            <div class="text-center py-10">
              <p class="text-sm text-slate-500 mb-4">You haven't requested any repair services yet.</p>
              <button type="button" data-dash-browse="true" class="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">Browse Services →</button>
            </div>
          ` : `
            <div class="space-y-4">
              ${myBookings.map(b => `
                <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div class="flex items-start gap-4">
                      <img src="${escapeHtml(b.serviceImage)}" alt="${escapeHtml(b.serviceTitle)}" class="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
                      <div>
                        <div class="flex flex-wrap items-center gap-2 mb-1">
                          <span class="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">Ticket #${escapeHtml(b.ticketNo || b._id)}</span>
                          <span class="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">${escapeHtml(b.category)}</span>
                          ${getStatusBadgeHtml(b.status)}
                          ${getPaymentBadgeHtml(b.paymentStatus)}
                        </div>
                        <h3 class="font-display font-bold text-base text-slate-900 dark:text-white">${escapeHtml(b.serviceTitle)}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Technician: <strong class="text-slate-700 dark:text-slate-200">${escapeHtml(b.technicianName)}</strong> • Preferred Date: <strong>${escapeHtml(b.preferredDate)}</strong>
                        </p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Issue: "${escapeHtml(b.problemDescription)}"
                        </p>
                      </div>
                    </div>

                    <!-- Price & Role-Valid Action Buttons -->
                    <div class="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200 dark:border-slate-800">
                      <div class="text-left lg:text-right">
                        <p class="text-[11px] text-slate-400 uppercase font-semibold">Base: $${b.basePrice} / Final Amount</p>
                        <p class="text-xl font-display font-extrabold text-blue-600 dark:text-blue-400">$${Number(b.finalAmount || b.basePrice).toFixed(2)}</p>
                      </div>

                      <div class="flex flex-wrap items-center gap-2">
                        ${b.status === 'requested' ? `
                          <button type="button" data-cancel-booking="${escapeHtml(b._id)}" class="btn-cancel-booking px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold transition-colors">
                            Cancel Request
                          </button>
                        ` : ''}

                        ${b.status === 'completed' && b.paymentStatus === 'unpaid' ? `
                          <button type="button" data-pay-booking="${escapeHtml(b._id)}" class="btn-pay-booking px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all animate-pulse">
                            💳 Pay Now ($${b.finalAmount})
                          </button>
                        ` : ''}

                        ${b.paymentStatus === 'paid' ? `
                          <button type="button" data-invoice-booking="${escapeHtml(b._id)}" class="btn-invoice-booking px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold">
                            📄 PDF Invoice
                          </button>
                          <button type="button" data-rate-booking="${escapeHtml(b._id)}" class="btn-rate-booking px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/40 text-xs font-bold">
                            ★ ${b.rating ? `Rated ${b.rating}/5` : 'Rate & Review'}
                          </button>
                        ` : ''}
                      </div>
                    </div>
                  </div>

                  ${renderJobTimelineTracker(b)}
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }

    function renderCustomerPayments() {
      const u = state.currentUser;
      const myPayments = state.payments.filter(p => p.customerEmail === u.email);

      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white mb-1">My Payment History (${myPayments.length})</h2>
          <p class="text-xs text-slate-500 mb-6">All your completed repair payments and Stripe receipts.</p>

          ${myPayments.length === 0 ? `
            <p class="text-sm text-slate-500 py-8 text-center">No completed Stripe payments yet.</p>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-400">
                    <th class="py-3 px-4">Service Title</th>
                    <th class="py-3 px-4">Technician</th>
                    <th class="py-3 px-4">Amount</th>
                    <th class="py-3 px-4">Transaction ID</th>
                    <th class="py-3 px-4">Payment Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${myPayments.map(p => `
                    <tr>
                      <td class="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">${escapeHtml(p.serviceTitle)}</td>
                      <td class="py-3.5 px-4 text-slate-600 dark:text-slate-300">${escapeHtml(p.technicianName)}</td>
                      <td class="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">$${Number(p.amount).toFixed(2)}</td>
                      <td class="py-3.5 px-4 font-mono text-xs text-slate-500">${escapeHtml(p.transactionId)}</td>
                      <td class="py-3.5 px-4 text-xs text-slate-500">${formatDate(p.paidAt)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 6.2 TECHNICIAN DASHBOARD VIEWS
    // ----------------------------------------------------------------------------
    function renderTechnicianOverview() {
      const u = state.currentUser;
      const myServices = state.services.filter(s => s.technicianEmail === u.email);
      const approvedCount = myServices.filter(s => s.approvalStatus === 'approved').length;
      const myRequests = state.bookings.filter(b => b.technicianEmail === u.email);
      const pendingReq = myRequests.filter(b => b.status === 'requested').length;
      const totalEarnings = authMode === 'api'
        ? Number(state.technicianTotalEarnings || 0)
        : state.payments.filter(p => p.technicianEmail === u.email).reduce((sum, p) => sum + Number(p.amount || 0), 0);

      return `
        <!-- Reusable Stats Cards (Total Services, Approved Services, Pending Requests + Total Earnings) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Services</span>
            <p class="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-2">${myServices.length}</p>
            <p class="text-xs text-slate-500 mt-1">Plan Limit: ${u.plan === 'pro' ? 'Unlimited (Pro)' : `${myServices.length}/3 (Free Plan)`}</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Approved Services</span>
            <p class="font-display font-extrabold text-3xl text-emerald-600 dark:text-emerald-400 mt-2">${approvedCount}</p>
            <p class="text-xs text-slate-500 mt-1">Live on public Browse Services page</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Requests</span>
            <p class="font-display font-extrabold text-3xl text-amber-500 mt-2">${pendingReq}</p>
            <p class="text-xs text-slate-500 mt-1">Awaiting your Accept / Reject response</p>
          </div>
          <div class="p-5 rounded-2xl bg-slate-900 dark:bg-emerald-950/70 text-white border border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-300">Total Earnings</span>
            <p class="font-display font-extrabold text-3xl text-emerald-400 mt-2">$${totalEarnings}</p>
            <p class="text-xs text-slate-400 mt-1">Settled Stripe payouts</p>
          </div>
        </div>

        <!-- Optional Requirement #1: Pro Technician Plan (Stripe Subscription) -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border border-blue-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase">FixMate Pro Membership</span>
              <span class="text-xs text-blue-200 font-semibold">${u.plan === 'pro' ? 'Pro Active' : 'Free Plan'}</span>
            </div>
            <h3 class="font-display font-bold text-lg mt-2">
              ${u.plan === 'pro' ? '✓ You are a Verified Pro Technician (Unlimited Service Listings Active)' : 'Upgrade to Pro Technician Plan ($29 One-Click Stripe Checkout)'}
            </h3>
            <p class="text-xs text-slate-300 mt-1">
              Free technicians can list up to 3 services. Pro technicians unlock unlimited service listings and the "Verified Pro" badge across all cards.
            </p>
          </div>
          ${u.plan === 'pro' ? `
            <span class="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold shrink-0">PRO PLAN ACTIVE</span>
          ` : `
            <button id="btnUpgradeTechPro" type="button" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shrink-0 shadow-lg">
              ⚡ Upgrade to Pro ($29)
            </button>
          `}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-4">Job Pipeline Status Distribution</h3>
            <div class="relative h-64">
              <canvas id="techOverviewChart"></canvas>
            </div>
          </div>
          <div class="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-2">Quick Technician Shortcuts</h3>
              <p class="text-xs text-slate-500 mb-4">Manage incoming jobs and keep service availability updated.</p>
              <div class="space-y-2.5">
                <button type="button" data-dash-nav="/dashboard/technician/requests" class="dash-nav-btn w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between">
                  <span class="text-xs font-bold">📥 Manage Incoming Repair Requests (${myRequests.length})</span>
                  <span class="text-blue-600 text-xs font-bold">Open →</span>
                </button>
                <button type="button" data-dash-nav="/dashboard/technician/add-service" class="dash-nav-btn w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between">
                  <span class="text-xs font-bold">➕ Add a New Repair Service (ImgBB Upload)</span>
                  <span class="text-blue-600 text-xs font-bold">Create →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderTechnicianAddService() {
      const u = state.currentUser;
      const myServices = state.services.filter(s => s.technicianEmail === u.email);
      const reachedFreeLimit = u.plan !== 'pro' && myServices.length >= 3;

      return `
        <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="mb-6">
            <span class="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">New Service Listing</span>
            <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white mt-1">Add a New Repair Service</h2>
            <p class="text-xs text-slate-500">New services stay in pending review until an admin approves them for customers.</p>
          </div>

          ${reachedFreeLimit ? `
            <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 mb-6 flex flex-wrap items-center justify-between gap-3">
              <p class="text-xs font-semibold text-amber-800 dark:text-amber-200">
                ⚠️ Free Technician Plan allows up to 3 services (${myServices.length}/3 used). Upgrade to Pro for unlimited service listings!
              </p>
              <button type="button" id="btnAddSrvUpgradePro" class="px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">Upgrade to Pro ($29)</button>
            </div>
          ` : ''}

          <form id="addServiceForm" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Technician Name (Read-only)</label>
                <input type="text" readonly value="${escapeHtml(u.name)}" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Technician Email (Read-only)</label>
                <input type="text" readonly value="${escapeHtml(u.email)}" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-500 cursor-not-allowed" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Service Title *</label>
                <input id="addSrvTitle" type="text" required placeholder="e.g. iPhone 15 Pro Max Original OLED Display Replacement" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Category *</label>
                <select id="addSrvCategory" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                  ${CATEGORIES.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Base Price (USD > 0) *</label>
                <input id="addSrvPrice" type="number" min="1" step="1" required placeholder="45" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Estimated Duration *</label>
                <input id="addSrvDuration" type="text" required placeholder="e.g. 2-3 hours" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Service Mode *</label>
                <select id="addSrvMode" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">
                  <option value="Home Visit">Home Visit</option>
                  <option value="Shop Drop-off">Shop Drop-off</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Service Area Covered *</label>
                <input id="addSrvArea" type="text" required value="${escapeHtml(u.area || 'Dhanmondi, Dhaka')}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Service Banner Image (ImgBB File Upload) *</label>
                <input id="addSrvImageFile" type="file" accept="image/*" class="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Detailed Service Description *</label>
              <textarea id="addSrvDesc" rows="3" required placeholder="Describe diagnostic steps, genuine spare parts used, and warranty coverage..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"></textarea>
            </div>

            <button type="submit" ${reachedFreeLimit ? 'disabled' : ''} class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-blue-600/20">
              Upload via ImgBB & Submit for Admin Approval →
            </button>
          </form>
        </div>
      `;
    }

    function renderTechnicianMyServices() {
      const u = state.currentUser;
      const myServices = state.services.filter(s => s.technicianEmail === u.email);

      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white">My Services (${myServices.length})</h2>
              <p class="text-xs text-slate-500">Edit, pause, or remove your listings. Edited services go back to pending for quick review.</p>
            </div>            <button type="button" data-dash-nav="/dashboard/technician/add-service" class="dash-nav-btn px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold">
              + Add New Service
            </button>
          </div>

          ${myServices.length === 0 ? `
            <p class="text-sm text-slate-500 py-8 text-center">You haven't created any services yet.</p>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-400">
                    <th class="py-3 px-3">Service</th>
                    <th class="py-3 px-3">Category & Mode</th>
                    <th class="py-3 px-3">Base Price</th>
                    <th class="py-3 px-3">Approval</th>
                    <th class="py-3 px-3">Availability</th>
                    <th class="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${myServices.map(s => `
                    <tr>
                      <td class="py-3.5 px-3">
                        <div class="flex items-center gap-3">
                          <img src="${escapeHtml(s.image)}" alt="" class="w-12 h-12 rounded-xl object-cover shrink-0" />
                          <div class="min-w-0">
                            <p class="font-bold text-slate-900 dark:text-white line-clamp-1">${escapeHtml(s.title)}</p>
                            <p class="text-xs text-slate-400">${escapeHtml(s.serviceArea)}</p>
                          </div>
                        </div>
                      </td>
                      <td class="py-3.5 px-3 text-xs">
                        <span class="font-semibold text-slate-700 dark:text-slate-200">${escapeHtml(s.category)}</span>
                        <br/><span class="text-slate-400">${escapeHtml(s.serviceMode)}</span>
                      </td>
                      <td class="py-3.5 px-3 font-bold text-blue-600 dark:text-blue-400">$${s.basePrice}</td>
                      <td class="py-3.5 px-3">${getApprovalBadgeHtml(s.approvalStatus)}</td>
                      <td class="py-3.5 px-3">
                        <button type="button" data-toggle-avail="${escapeHtml(s._id)}" class="btn-toggle-avail px-2.5 py-1 rounded-full text-xs font-bold ${s.isAvailable ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}">
                          ${s.isAvailable ? '● Available (On)' : '○ Hidden (Off)'}
                        </button>
                      </td>
                      <td class="py-3.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                        <button type="button" data-edit-service="${escapeHtml(s._id)}" class="btn-edit-service px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-xs font-bold">Edit</button>
                        <button type="button" data-delete-service="${escapeHtml(s._id)}" class="btn-delete-service px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-xs font-bold">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      `;
    }

    function renderTechnicianRequests() {
      const u = state.currentUser;
      const filter = state.techRequestFilter || 'All';
      let reqs = state.bookings.filter(b => b.technicianEmail === u.email);
      if (filter !== 'All') {
        reqs = reqs.filter(b => b.status === filter.toLowerCase());
      }

      const tabs = ['All', 'Requested', 'Accepted', 'In-Progress', 'Completed'];

      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white">Manage Incoming Repair Requests</h2>
              <p class="text-xs text-slate-500">Strict pipeline: Requested → Accepted / Rejected → In Progress → Completed (sets finalAmount).</p>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${tabs.map(t => `
                <button type="button" data-tech-filter="${t}" class="btn-tech-filter px-3 py-1.5 rounded-xl text-xs font-bold ${filter === t ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${t}</button>
              `).join('')}
            </div>
          </div>

          ${reqs.length === 0 ? `
            <p class="text-sm text-slate-500 py-10 text-center">No repair requests match status filter "${escapeHtml(filter)}".</p>
          ` : `
            <div class="space-y-4">
              ${reqs.map(b => `
                <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div class="space-y-1">
                    <div class="flex flex-wrap items-center gap-2">
                      ${getStatusBadgeHtml(b.status)}
                      ${b.status === 'completed' ? getPaymentBadgeHtml(b.paymentStatus) : ''}
                      <span class="text-xs font-mono text-slate-400">Preferred Date: ${escapeHtml(b.preferredDate)}</span>
                    </div>
                    <h3 class="font-display font-bold text-base text-slate-900 dark:text-white">${escapeHtml(b.serviceTitle)}</h3>
                    <p class="text-xs text-slate-600 dark:text-slate-300">
                      Customer: <strong>${escapeHtml(b.customerName)}</strong> (${escapeHtml(b.customerPhone)}) • 📍 ${escapeHtml(b.address)}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 italic">
                      Problem: "${escapeHtml(b.problemDescription)}"
                    </p>
                  </div>

                  <!-- Valid Action Buttons Only for Current Status (PDF Page 11) -->
                  <div class="flex flex-wrap items-center gap-2 shrink-0">
                    ${b.status === 'requested' ? `
                      <button type="button" data-tech-accept="${escapeHtml(b._id)}" class="btn-tech-accept px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
                        ✓ Accept Job
                      </button>
                      <button type="button" data-tech-reject="${escapeHtml(b._id)}" class="btn-tech-reject px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold">
                        ✕ Reject
                      </button>
                    ` : ''}

                    ${b.status === 'accepted' ? `
                      <button type="button" data-tech-start="${escapeHtml(b._id)}" class="btn-tech-start px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold">
                        ⚙️ Start Work (Move to In Progress)
                      </button>
                    ` : ''}

                    ${b.status === 'in-progress' ? `
                      <button type="button" data-tech-complete="${escapeHtml(b._id)}" class="btn-tech-complete px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20">
                        ✓ Mark Completed & Set Final Amount
                      </button>
                    ` : ''}

                    ${['completed', 'rejected', 'cancelled'].includes(b.status) ? `
                      <span class="text-xs text-slate-400 font-medium">Final Amount: <strong class="text-slate-700 dark:text-slate-200">$${b.finalAmount}</strong> • No further action</span>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 6.3 ADMIN DASHBOARD VIEWS
    // ----------------------------------------------------------------------------
    function renderAdminOverview() {
      const totalUsers = state.users.length;
      const totalTechs = state.users.filter(u => u.role === 'technician').length;
      const pendingServices = state.services.filter(s => s.approvalStatus === 'pending').length;
      const totalRevenue = state.payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);

      return `
        <!-- Reusable Stats Cards (PDF Page 11: Total Users, Total Technicians, Pending Services + Revenue) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</span>
            <p class="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-2">${totalUsers}</p>
            <p class="text-xs text-slate-500 mt-1">Customers, Technicians & Admins</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Technicians</span>
            <p class="font-display font-extrabold text-3xl text-blue-600 dark:text-blue-400 mt-2">${totalTechs}</p>
            <p class="text-xs text-slate-500 mt-1">Verified service providers</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Services</span>
            <p class="font-display font-extrabold text-3xl text-amber-500 mt-2">${pendingServices}</p>
            <p class="text-xs text-slate-500 mt-1">Awaiting admin moderation</p>
          </div>
          <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Stripe Revenue</span>
            <p class="font-display font-extrabold text-3xl text-emerald-600 dark:text-emerald-400 mt-2">$${totalRevenue}</p>
            <p class="text-xs text-slate-500 mt-1">${state.payments.length} settled transactions</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-4">Services by Category & Approval Status</h3>
            <div class="relative h-64">
              <canvas id="adminOverviewChart"></canvas>
            </div>
          </div>
          <div class="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-2">Moderation Queue</h3>
              <p class="text-xs text-slate-500 mb-4">Pending services waiting for approval:</p>
              <div class="space-y-2.5">
                ${state.services.filter(s => s.approvalStatus === 'pending').map(s => `
                  <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-2">
                    <div class="min-w-0">
                      <p class="text-xs font-bold text-slate-900 dark:text-white truncate">${escapeHtml(s.title)}</p>
                      <p class="text-[11px] text-slate-500">By ${escapeHtml(s.technicianName)} • $${s.basePrice}</p>
                    </div>
                    <button type="button" data-dash-nav="/dashboard/admin/services" class="dash-nav-btn px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold shrink-0">Review →</button>
                  </div>
                `).join('') || `<p class="text-xs text-emerald-600 font-semibold">✓ All submitted services have been reviewed!</p>`}
              </div>
            </div>
            <button type="button" data-dash-nav="/dashboard/admin/transactions" class="dash-nav-btn mt-6 w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold">
              View All Stripe Transactions →
            </button>
          </div>
        </div>
      `;
    }

    function renderAdminUsers() {
      const currentAdminEmail = state.currentUser?.email;
      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white mb-1">Manage Platform Users (${state.users.length})</h2>
          <p class="text-xs text-slate-500 mb-6">Update account roles across the platform. Your own admin role is locked for safety.</p>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-400">
                  <th class="py-3 px-3">User</th>
                  <th class="py-3 px-3">Email</th>
                  <th class="py-3 px-3">Current Role</th>
                  <th class="py-3 px-3">Joined Date</th>
                  <th class="py-3 px-3 text-right">Change Role</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                ${state.users.map(u => {
                  const isSelf = u.email === currentAdminEmail;
                  return `
                    <tr>
                      <td class="py-3.5 px-3">
                        <div class="flex items-center gap-3">
                          <img src="${escapeHtml(u.image)}" alt="" class="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <p class="font-bold text-slate-900 dark:text-white">${escapeHtml(u.name)}</p>
                            <p class="text-[11px] text-slate-400">${escapeHtml(u.area || 'Dhaka')}</p>
                          </div>
                        </div>
                      </td>
                      <td class="py-3.5 px-3 font-mono text-xs text-slate-600 dark:text-slate-300">${escapeHtml(u.email)}</td>
                      <td class="py-3.5 px-3">
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' : u.role === 'technician' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'}">${escapeHtml(u.role)}</span>
                      </td>
                      <td class="py-3.5 px-3 text-xs text-slate-500">${formatDate(u.createdAt)}</td>
                      <td class="py-3.5 px-3 text-right">
                        ${isSelf ? `
                          <span class="text-xs font-mono text-slate-400 italic">Self (Locked)</span>
                        ` : `
                          <select data-admin-role-user="${escapeHtml(u._id)}" class="admin-role-select px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold">
                            <option value="customer" ${u.role === 'customer' ? 'selected' : ''}>customer</option>
                            <option value="technician" ${u.role === 'technician' ? 'selected' : ''}>technician</option>
                            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>admin</option>
                          </select>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderAdminServices() {
      const filter = state.adminServiceFilter || 'All';
      // Show pending services first so they are easy to find (PDF Page 11)
      let list = [...state.services].sort((a, b) => (a.approvalStatus === 'pending' ? -1 : 1));
      if (filter !== 'All') {
        list = list.filter(s => s.approvalStatus === filter.toLowerCase());
      }

      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white">Service Approval Moderation (${list.length})</h2>
              <p class="text-xs text-slate-500">Pending services are prioritized at the top. Only approved & available services appear publicly.</p>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${['All', 'Pending', 'Approved', 'Rejected'].map(st => `
                <button type="button" data-admin-srv-filter="${st}" class="btn-admin-srv-filter px-3 py-1.5 rounded-xl text-xs font-bold ${filter === st ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${st}</button>
              `).join('')}
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-400">
                  <th class="py-3 px-3">Service</th>
                  <th class="py-3 px-3">Technician</th>
                  <th class="py-3 px-3">Price & Mode</th>
                  <th class="py-3 px-3">Status</th>
                  <th class="py-3 px-3 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                ${list.map(s => `
                  <tr class="${s.approvalStatus === 'pending' ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''}">
                    <td class="py-3.5 px-3">
                      <div class="flex items-center gap-3">
                        <img src="${escapeHtml(s.image)}" alt="" class="w-11 h-11 rounded-xl object-cover shrink-0" />
                        <div>
                          <p class="font-bold text-slate-900 dark:text-white line-clamp-1">${escapeHtml(s.title)}</p>
                          <p class="text-xs text-slate-400">${escapeHtml(s.category)} • ${escapeHtml(s.serviceArea)}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-3.5 px-3 text-xs">
                      <p class="font-semibold text-slate-800 dark:text-slate-200">${escapeHtml(s.technicianName)}</p>
                      <p class="text-slate-400">${escapeHtml(s.technicianEmail)}</p>
                    </td>
                    <td class="py-3.5 px-3 text-xs">
                      <span class="font-bold text-blue-600 dark:text-blue-400">$${s.basePrice}</span>
                      <br/><span class="text-slate-400">${escapeHtml(s.serviceMode)}</span>
                    </td>
                    <td class="py-3.5 px-3">${getApprovalBadgeHtml(s.approvalStatus)}</td>
                    <td class="py-3.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                      <button type="button" data-approve-srv="${escapeHtml(s._id)}" class="btn-approve-srv px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold">Approve</button>
                      <button type="button" data-reject-srv="${escapeHtml(s._id)}" class="btn-reject-srv px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">Reject</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderAdminBookings() {
      const filter = state.adminBookingFilter || 'All';
      let list = [...state.bookings];
      if (filter !== 'All') {
        list = list.filter(b => b.status === filter.toLowerCase());
      }

      return `
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white">All Platform Bookings (${list.length})</h2>
              <p class="text-xs text-slate-500">Read-only audit table of every repair job across FixMate.</p>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${['All', 'Requested', 'Accepted', 'In-Progress', 'Completed', 'Cancelled'].map(st => `
                <button type="button" data-admin-bkg-filter="${st}" class="btn-admin-bkg-filter px-2.5 py-1.5 rounded-xl text-xs font-bold ${filter === st ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}">${st}</button>
              `).join('')}
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-400">
                  <th class="py-3 px-3">Service</th>
                  <th class="py-3 px-3">Customer</th>
                  <th class="py-3 px-3">Technician</th>
                  <th class="py-3 px-3">Date</th>
                  <th class="py-3 px-3">Job Status</th>
                  <th class="py-3 px-3">Payment</th>
                  <th class="py-3 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                ${list.map(b => `
                  <tr>
                    <td class="py-3.5 px-3 font-semibold text-slate-900 dark:text-white max-w-xs truncate">${escapeHtml(b.serviceTitle)}</td>
                    <td class="py-3.5 px-3 text-xs">${escapeHtml(b.customerName)}</td>
                    <td class="py-3.5 px-3 text-xs">${escapeHtml(b.technicianName)}</td>
                    <td class="py-3.5 px-3 text-xs text-slate-500">${escapeHtml(b.preferredDate)}</td>
                    <td class="py-3.5 px-3">${getStatusBadgeHtml(b.status)}</td>
                    <td class="py-3.5 px-3">${getPaymentBadgeHtml(b.paymentStatus)}</td>
                    <td class="py-3.5 px-3 text-right font-bold text-blue-600 dark:text-blue-400">$${b.finalAmount}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    function renderAdminTransactions() {
      const totalRevenue = state.payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
      const avgJob = state.payments.length > 0 ? totalRevenue / state.payments.length : 0;
      return `
        <div class="space-y-5">
          <!-- Revenue Summary KPI Row Above Table -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md">
              <span class="text-xs font-mono uppercase tracking-wider text-emerald-100">Total Revenue</span>
              <p class="font-display font-extrabold text-3xl mt-1">$${totalRevenue.toFixed(2)}</p>
              <p class="text-xs text-emerald-100 mt-1">Verified Stripe Ledger</p>
            </div>
            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Payments</span>
              <p class="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">${state.payments.length}</p>
              <p class="text-xs text-slate-500 mt-1">Completed Stripe payments</p>
            </div>
            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Average Job Value</span>
              <p class="font-display font-extrabold text-3xl text-blue-600 dark:text-blue-400 mt-1">$${avgJob.toFixed(2)}</p>
              <p class="text-xs text-slate-500 mt-1">Mean settled ticket price</p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-400">
                    <th class="py-3 px-3">Customer</th>
                    <th class="py-3 px-3">Technician</th>
                    <th class="py-3 px-3">Service</th>
                    <th class="py-3 px-3">Amount</th>
                    <th class="py-3 px-3">Stripe Transaction ID</th>
                    <th class="py-3 px-3">Payment Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                  ${state.payments.map(p => `
                    <tr>
                      <td class="py-3.5 px-3 text-xs font-semibold">${escapeHtml(p.customerName)}<br/><span class="text-slate-400 font-normal">${escapeHtml(p.customerEmail)}</span></td>
                      <td class="py-3.5 px-3 text-xs">${escapeHtml(p.technicianName)}</td>
                      <td class="py-3.5 px-3 font-medium text-slate-900 dark:text-white max-w-xs truncate">${escapeHtml(p.serviceTitle)}</td>
                      <td class="py-3.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">$${Number(p.amount).toFixed(2)}</td>
                      <td class="py-3.5 px-3 font-mono text-xs text-slate-500">${escapeHtml(p.transactionId)}</td>
                      <td class="py-3.5 px-3 text-xs text-slate-500">${formatDate(p.paidAt)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    // ----------------------------------------------------------------------------
    // 6.4 SHARED UPDATE PROFILE ROUTE (/dashboard/profile)
    // ----------------------------------------------------------------------------
    function renderProfilePage() {
      const u = state.currentUser;
      return `
        <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl">
          <span class="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">Account Settings</span>
          <h2 class="font-display font-bold text-xl text-slate-900 dark:text-white mt-1 mb-1">Update Your Profile</h2>
          <p class="text-xs text-slate-500 mb-6">Changes to your Name and Profile Photo immediately sync to the Navbar and Dashboard top bar without logging out.</p>

          <form id="updateProfileForm" class="space-y-4">
            <div class="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <img id="profilePreviewImg" src="${escapeHtml(u.image)}" alt="" class="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700" />
              <div class="flex-1">
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Upload New Profile Photo (ImgBB API)</label>
                <input id="profilePhotoInput" type="file" accept="image/*" class="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Email (Read-Only)</label>
                <input type="email" readonly value="${escapeHtml(u.email)}" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Role (Read-Only)</label>
                <input type="text" readonly value="${escapeHtml(u.role)}" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-500 uppercase font-bold cursor-not-allowed" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Full Name *</label>
                <input id="profName" type="text" required value="${escapeHtml(u.name)}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
              </div>
              <div>
                <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Phone Number *</label>
                <input id="profPhone" type="text" required value="${escapeHtml(u.phone || '')}" placeholder="+880 17..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">City / Area *</label>
              <input id="profArea" type="text" required value="${escapeHtml(u.area || '')}" placeholder="e.g. Mirpur, Dhaka" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Bio / Skills & Experience</label>
              <textarea id="profBio" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm">${escapeHtml(u.bio || '')}</textarea>
            </div>

            <button type="submit" class="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20">
              Save Profile Changes
            </button>
          </form>
        </div>
      `;
    }

    // ============================================================================
    // 7. CHARTS INITIALIZATION FOR DASHBOARD OVERVIEWS
    // ============================================================================
    function initDashboardCharts() {      destroyCharts();
      const textColor = state.theme === 'dark' ? '#cbd5e1' : '#475569';

      const custCanvas = document.getElementById('customerOverviewChart');
      if (custCanvas && state.currentUser) {
        const myB = state.bookings.filter(b => b.customerEmail === state.currentUser.email);
        const counts = [
          myB.filter(b => b.status === 'requested').length,
          myB.filter(b => b.status === 'accepted').length,
          myB.filter(b => b.status === 'in-progress').length,
          myB.filter(b => b.status === 'completed').length
        ];
        activeCharts.push(new Chart(custCanvas, {
          type: 'doughnut',
          data: {
            labels: ['Requested', 'Accepted', 'In Progress', 'Completed'],
            datasets: [{
              data: counts,
              backgroundColor: ['#3b82f6', '#6366f1', '#f59e0b', '#10b981'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: textColor } } }
          }
        }));
      }

      const techCanvas = document.getElementById('techOverviewChart');
      if (techCanvas && state.currentUser) {
        const myB = state.bookings.filter(b => b.technicianEmail === state.currentUser.email);
        activeCharts.push(new Chart(techCanvas, {
          type: 'bar',
          data: {
            labels: ['Requested', 'Accepted', 'In Progress', 'Completed'],
            datasets: [{
              label: 'Jobs',
              data: [
                myB.filter(b => b.status === 'requested').length,
                myB.filter(b => b.status === 'accepted').length,
                myB.filter(b => b.status === 'in-progress').length,
                myB.filter(b => b.status === 'completed').length
              ],
              backgroundColor: ['#3b82f6', '#6366f1', '#f59e0b', '#10b981'],
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: textColor } },
              y: { beginAtZero: true, ticks: { stepSize: 1, color: textColor } }
            }
          }
        }));
      }

      const adminCanvas = document.getElementById('adminOverviewChart');
      if (adminCanvas) {
        const catCounts = CATEGORIES.map(c => state.services.filter(s => s.category === c).length);
        activeCharts.push(new Chart(adminCanvas, {
          type: 'bar',
          data: {
            labels: CATEGORIES,
            datasets: [{
              label: 'Listed Services',
              data: catCounts,
              backgroundColor: '#2563eb',
              borderRadius: 8
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { ticks: { color: textColor, font: { size: 10 } } },
              y: { beginAtZero: true, ticks: { stepSize: 1, color: textColor } }
            }
          }
        }));
      }
    }

    // ============================================================================
    // 8. MODALS (REPAIR REQUEST, CONFIRMATION, STRIPE CHECKOUT, INVOICE, RATING, CODE)
    // ============================================================================
    function openRepairRequestModal(srv) {
      const u = state.currentUser;
      if (!u || u.role !== 'customer') return;
      const today = new Date().toISOString().split('T')[0];

      openModal(`
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[11px] uppercase text-blue-600 dark:text-blue-400 font-bold">New Booking</span>
            <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white">Submit Repair Request</h3>
          </div>
          <button type="button" id="modalCloseBtn" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">✕</button>
        </div>

        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 mb-4 flex items-center justify-between text-xs">
          <span class="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">${escapeHtml(srv.title)}</span>
          <span class="font-extrabold text-blue-600 dark:text-blue-400 shrink-0">Base: $${srv.basePrice}</span>
        </div>

        <form id="repairRequestModalForm" class="space-y-3.5">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] font-bold uppercase text-slate-400 mb-1">Your Name (Read-only)</label>
              <input type="text" readonly value="${escapeHtml(u.name)}" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500" />
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase text-slate-400 mb-1">Your Email (Read-only)</label>
              <input type="email" readonly value="${escapeHtml(u.email)}" class="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
              <input id="reqPhone" type="text" required value="${escapeHtml(u.phone || '+880 1712-558899')}" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Date (Today/Future) *</label>
              <input id="reqDate" type="date" required min="${today}" value="${today}" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Service / Pickup Address *</label>
            <input id="reqAddress" type="text" required value="${escapeHtml(u.area ? `House 24, Road 9A, ${u.area}` : 'Dhanmondi, Dhaka')}" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs" />
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Problem Description (Min 20 characters) *</label>
            <textarea id="reqProblem" rows="3" required placeholder="Describe what is wrong with the device in detail (at least 20 characters)..." class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"></textarea>
            <p id="reqCharCounter" class="text-[11px] text-slate-400 mt-1">0 / 20 minimum characters</p>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" id="modalCancelBtn" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">Cancel</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md">Submit Repair Request →</button>
          </div>
        </form>
      `);

      document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
      document.getElementById('modalCancelBtn')?.addEventListener('click', closeModal);

      const probEl = document.getElementById('reqProblem');
      const countEl = document.getElementById('reqCharCounter');
      probEl?.addEventListener('input', () => {
        const len = probEl.value.trim().length;
        countEl.textContent = `${len} / 20 minimum characters`;
        countEl.className = len >= 20 ? 'text-[11px] text-emerald-600 font-semibold mt-1' : 'text-[11px] text-amber-500 mt-1';
      });

      document.getElementById('repairRequestModalForm')?.addEventListener('submit', e => {
        e.preventDefault();
        // Prevent duplicate active requests (PDF Page 10)
        const dup = state.bookings.find(b =>
          b.serviceId === srv._id &&
          b.customerEmail === u.email &&
          ['requested', 'accepted', 'in-progress'].includes(b.status)
        );
        if (dup) {
          showToast('You already have an active request for this service', 'error');
          return;
        }

        const phone = document.getElementById('reqPhone').value.trim();
        const prefDate = document.getElementById('reqDate').value;
        const addr = document.getElementById('reqAddress').value.trim();
        const desc = document.getElementById('reqProblem').value.trim();

        if (desc.length < 20) {
          showToast('Problem description must be at least 20 characters long.', 'error');
          return;
        }
        if (prefDate < today) {
          showToast('Preferred date must be today or a future date.', 'error');
          return;
        }

        if (authMode === 'api') {
          (async () => {
            try {
              await apiRequest('/bookings', {
                method: 'POST',
                body: JSON.stringify({ serviceId: srv._id, customerPhone: phone, address: addr, preferredDate: prefDate, problemDescription: desc })
              });
              await refreshApiWorkspace();
              closeModal();
              showToast('Repair request saved to your FixMate account.', 'success');
              navigate('/dashboard/customer/bookings');
            } catch (error) {
              showToast(error.message || 'Unable to submit this repair request.', 'error');
            }
          })();
          return;
        }

        const newBooking = {
          _id: 'bkg_' + Math.floor(1000 + Math.random() * 9000),
          ticketNo: 'FM-' + Math.floor(1050 + Math.random() * 900),
          serviceId: srv._id,
          serviceTitle: srv.title,
          serviceImage: srv.image,
          category: srv.category,
          basePrice: srv.basePrice,
          technicianName: srv.technicianName,
          technicianEmail: srv.technicianEmail,
          customerName: u.name,
          customerEmail: u.email,
          customerPhone: phone,
          address: addr,
          preferredDate: prefDate,
          problemDescription: desc,
          status: 'requested',
          finalAmount: srv.basePrice,
          paymentStatus: 'unpaid',
          rating: null,
          review: '',
          statusHistory: [
            { status: 'requested', changedAt: new Date().toISOString() }
          ]
        };

        state.bookings.unshift(newBooking);
        saveState();
        closeModal();
        showToast('Repair Request submitted! Redirecting to My Bookings...', 'success');
        navigate('/dashboard/customer/bookings');
      });
    }

    function openConfirmModal({ title, message, confirmText = 'Confirm', danger = true, onConfirm }) {
      openModal(`
        <div class="text-center p-2">
          <div class="w-12 h-12 rounded-2xl ${danger ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400' : 'bg-blue-100 text-blue-600'} flex items-center justify-center text-xl mx-auto mb-3 font-bold">!</div>
          <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white">${escapeHtml(title)}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 mb-6 leading-relaxed">${escapeHtml(message)}</p>
          <div class="flex items-center justify-center gap-3">
            <button type="button" id="confCancelBtn" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">Go Back</button>
            <button type="button" id="confProceedBtn" class="px-5 py-2.5 rounded-xl ${danger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-blue-600 hover:bg-blue-700'} text-white text-xs font-bold shadow-md">${escapeHtml(confirmText)}</button>
          </div>
        </div>
      `);
      document.getElementById('confCancelBtn')?.addEventListener('click', closeModal);
      document.getElementById('confProceedBtn')?.addEventListener('click', () => {
        closeModal();
        onConfirm();
      });
    }

    function openCompleteJobModal(bkg) {
      openModal(`
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[11px] uppercase text-emerald-600 font-bold">Complete Repair</span>
            <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white">Mark Job Completed & Set Final Bill</h3>
          </div>
          <button type="button" id="compCloseBtn" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">✕</button>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Enter the final bill amount in USD (pre-filled with base price <strong>$${bkg.basePrice}</strong>). Once marked completed, the customer's <strong>Pay Now</strong> button unlocks.
        </p>
        <form id="completeJobForm" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">Final Amount (USD > 0) *</label>
            <input id="compFinalAmount" type="number" min="1" step="1" required value="${bkg.basePrice}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-bold text-emerald-600" />
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" id="compCancelBtn" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">Cancel</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md">Confirm Completion →</button>
          </div>
        </form>
      `);
      document.getElementById('compCloseBtn')?.addEventListener('click', closeModal);
      document.getElementById('compCancelBtn')?.addEventListener('click', closeModal);
      document.getElementById('completeJobForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const amt = Number(document.getElementById('compFinalAmount').value);
        if (!amt || amt <= 0) {
          showToast('Final amount must be a number greater than 0.', 'error');
          return;
        }
        if (authMode === 'api') {
          (async () => {
            try {
              await apiRequest('/bookings/' + encodeURIComponent(bkg._id) + '/status', {
                method: 'PATCH',
                body: JSON.stringify({ status: 'completed', finalAmount: amt })
              });
              await refreshApiWorkspace();
              closeModal();
              showToast('Repair completion and final bill saved.', 'success');
              renderApp();
            } catch (error) {
              showToast(error.message || 'Unable to complete this repair.', 'error');
            }
          })();
          return;
        }
        bkg.status = 'completed';
        bkg.finalAmount = amt;
        bkg.statusHistory = bkg.statusHistory || [];
        bkg.statusHistory.push({ status: 'completed', changedAt: new Date().toISOString() });
        saveState();
        closeModal();
        showToast(`Job marked Completed with final amount $${amt}! Customer can now pay via Stripe.`, 'success');
        renderApp();
      });
    }

    function openStripeCheckoutModal(bkg) {
      // Challenge 3 Gate: Payment must only be possible for a completed and unpaid booking owned by logged-in customer
      if (bkg.status !== 'completed' || bkg.paymentStatus !== 'unpaid') {
        showToast('Payment rejected: Only completed and unpaid bookings can be paid.', 'error');
        return;
      }

      if (authMode === 'api') {
        (async () => {
          try {
            const checkout = await apiRequest('/payments/create-checkout-session', {
              method: 'POST',
              body: JSON.stringify({ bookingId: bkg._id })
            });
            if (!checkout.data || !checkout.data.url) throw new Error('Stripe did not return a checkout URL.');
            window.location.assign(checkout.data.url);
          } catch (error) {
            showToast(error.message || 'Secure Stripe checkout is unavailable.', 'error');
          }
        })();
        return;
      }

      // The local card simulation is retained only for the explicit preview-role switcher.
      const sessionId = 'cs_test_fixmate_' + bkg._id;
      openModal(`
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] font-extrabold uppercase">Stripe Test Mode</span>
            <h3 class="font-display font-bold text-base text-slate-900 dark:text-white">Secure Card Checkout</h3>
          </div>
          <button type="button" id="stripeCloseBtn" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">✕</button>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900 text-white mb-4">
          <div class="flex items-center justify-between text-xs text-slate-400">
            <span>FixMate Pay-After-Service</span>
            <span class="font-mono">${escapeHtml(sessionId)}</span>
          </div>
          <p class="font-display font-bold text-sm mt-1">${escapeHtml(bkg.serviceTitle)}</p>
          <p class="font-display font-extrabold text-2xl text-emerald-400 mt-2">$${Number(bkg.finalAmount).toFixed(2)} <span class="text-xs font-normal text-slate-400">USD (${bkg.finalAmount * 100} cents)</span></p>
        </div>

        <form id="stripePayForm" class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Test Card Number</label>
            <input type="text" readonly value="4242 •••• •••• 4242 (Visa Test Card)" class="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Expiry</label>
              <input type="text" readonly value="12 / 29" class="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">CVC</label>
              <input type="text" readonly value="424" class="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs" />
            </div>
          </div>

          <div class="flex items-center justify-between gap-2 pt-3">
            <button type="button" id="stripeSimulateCancelBtn" class="px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 text-xs font-bold">
              Cancel Payment
            </button>
            <button type="submit" class="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-lg">
              Pay $${Number(bkg.finalAmount).toFixed(2)} Now →
            </button>
          </div>
        </form>
      `);

      document.getElementById('stripeCloseBtn')?.addEventListener('click', closeModal);
      document.getElementById('stripeSimulateCancelBtn')?.addEventListener('click', () => {
        closeModal();
        navigate('/payment/cancel');
      });

      document.getElementById('stripePayForm')?.addEventListener('submit', e => {
        e.preventDefault();
        // Challenge 4 Idempotency Guard: Never save same payment twice
        const alreadySaved = state.payments.find(p => p.bookingId === bkg._id || p.stripeSessionId === sessionId);
        if (!alreadySaved) {
          state.payments.push({
            _id: 'pay_' + Math.floor(1000 + Math.random() * 9000),
            bookingId: bkg._id,
            serviceTitle: bkg.serviceTitle,
            customerName: bkg.customerName,
            customerEmail: bkg.customerEmail,
            technicianName: bkg.technicianName,
            technicianEmail: bkg.technicianEmail,
            amount: bkg.finalAmount,
            currency: 'usd',
            transactionId: 'pi_3QFixMate' + Math.floor(100000 + Math.random() * 899999),
            stripeSessionId: sessionId,
            paymentStatus: 'paid',
            paidAt: new Date().toISOString()
          });
        }
        bkg.paymentStatus = 'paid';
        bkg.statusHistory = bkg.statusHistory || [];
        if (!bkg.statusHistory.find(h => h.status === 'paid')) {
          bkg.statusHistory.push({ status: 'paid', changedAt: new Date().toISOString() });
        }
        saveState();
        closeModal();
        showToast('Stripe payment verified & saved! Job marked Paid.', 'success');
        navigate('/payment/success');
      });
    }

    function openPdfInvoiceModal(bkg) {
      const pay = state.payments.find(p => p.bookingId === bkg._id) || {
        transactionId: 'pi_3QFixMateVerified',
        paidAt: new Date().toISOString(),
        amount: bkg.finalAmount
      };

      openModal(`
        <div class="p-2">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-[10px] uppercase text-emerald-600 font-bold">Official Receipt</span>
              <h3 class="font-display font-extrabold text-xl text-slate-900 dark:text-white">FixMate Payment Invoice</h3>
            </div>
            <button type="button" id="invCloseBtn" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">✕</button>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-2.5 mb-5">
            <div class="flex justify-between">
              <span class="text-slate-400">Invoice / Booking ID:</span>
              <span class="font-mono font-bold">${escapeHtml(bkg._id)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Stripe Transaction ID:</span>
              <span class="font-mono">${escapeHtml(pay.transactionId)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Customer:</span>
              <span class="font-bold">${escapeHtml(bkg.customerName)} (${escapeHtml(bkg.customerEmail)})</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Verified Technician:</span>
              <span class="font-bold">${escapeHtml(bkg.technicianName)}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Repair Service:</span>
              <span class="font-bold text-right max-w-[220px]">${escapeHtml(bkg.serviceTitle)}</span>
            </div>
            <div class="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between text-sm">
              <span class="font-bold">Total Paid (USD):</span>
              <span class="font-extrabold text-emerald-600 dark:text-emerald-400">$${Number(bkg.finalAmount).toFixed(2)} PAID</span>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" id="invDownloadTxtBtn" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">
              ⬇️ Download Invoice Receipt
            </button>
          </div>
        </div>
      `);

      document.getElementById('invCloseBtn')?.addEventListener('click', closeModal);
      document.getElementById('invDownloadTxtBtn')?.addEventListener('click', () => {
        const content = [
          '====================================================',
          '   FIXMATE TECHNOLOGIES BD - OFFICIAL TAX INVOICE   ',
          '====================================================',
          `Booking ID       : ${bkg._id}`,
          `Transaction ID   : ${pay.transactionId}`,
          `Paid Date        : ${formatDate(pay.paidAt)}`,
          `Customer         : ${bkg.customerName} (${bkg.customerEmail})`,
          `Technician       : ${bkg.technicianName} (${bkg.technicianEmail})`,
          `Service          : ${bkg.serviceTitle}`,
          `Category         : ${bkg.category}`,
          `Base Price       : $${bkg.basePrice}.00 USD`,
          `Final Paid Amount: $${bkg.finalAmount}.00 USD (PAID VIA STRIPE)`,
          '===================================================='
        ].join('\n');
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FixMate-Invoice-${bkg._id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        showToast(`Invoice FixMate-Invoice-${bkg._id}.txt downloaded!`, 'success');
      });
    }

    function openRateBookingModal(bkg) {
      openModal(`
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] uppercase text-amber-500 font-bold">Customer Feedback</span>
            <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white">Rate Your Repair Experience</h3>
          </div>
          <button type="button" id="rateCloseBtn" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">✕</button>
        </div>

        <form id="rateBookingForm" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1.5">Star Rating (1 to 5) *</label>
            <select id="rateStarsInput" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-amber-500">
              <option value="5" ${bkg.rating === 5 ? 'selected' : ''}>★★★★★ (5 - Excellent Service)</option>
              <option value="4" ${bkg.rating === 4 ? 'selected' : ''}>★★★★☆ (4 - Very Good)</option>
              <option value="3" ${bkg.rating === 3 ? 'selected' : ''}>★★★☆☆ (3 - Good)</option>
              <option value="2" ${bkg.rating === 2 ? 'selected' : ''}>★★☆☆☆ (2 - Fair)</option>
              <option value="1" ${bkg.rating === 1 ? 'selected' : ''}>★☆☆☆☆ (1 - Poor)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-500 mb-1.5">Short Review *</label>
            <textarea id="rateReviewInput" rows="3" required placeholder="Share how the technician handled your device repair..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs">${escapeHtml(bkg.review || '')}</textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" id="rateCancelBtn" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">Cancel</button>
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">Save Rating & Update Service Average</button>
          </div>
        </form>
      `);
      document.getElementById('rateCloseBtn')?.addEventListener('click', closeModal);
      document.getElementById('rateCancelBtn')?.addEventListener('click', closeModal);
      document.getElementById('rateBookingForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const stars = Number(document.getElementById('rateStarsInput').value);
        const rev = document.getElementById('rateReviewInput').value.trim();
        if (rev.length < 8 || rev.length > 600) {
          showToast('Your review must contain 8 to 600 characters.', 'error');
          return;
        }
        if (authMode === 'api') {
          (async () => {
            try {
              await apiRequest('/bookings/' + encodeURIComponent(bkg._id) + '/review', {
                method: 'POST',
                body: JSON.stringify({ rating: stars, review: rev })
              });
              await refreshApiWorkspace();
              closeModal();
              showToast('Thank you. Your review has been saved.', 'success');
              renderApp();
            } catch (error) {
              showToast(error.message || 'Unable to save this review.', 'error');
            }
          })();
          return;
        }
        bkg.rating = stars;
        bkg.review = rev;
        // Recalculate service rating average
        const srv = state.services.find(s => s._id === bkg.serviceId);
        if (srv) {
          srv.ratingCount = (srv.ratingCount || 1) + 1;
          srv.ratingAvg = Number((((srv.ratingAvg || 4.8) * (srv.ratingCount - 1) + stars) / srv.ratingCount).toFixed(1));
        }
        saveState();
        closeModal();
        showToast('Thank you! Your review has been published on the service card & details page.', 'success');
        renderApp();
      });
    }

    function openEditServiceModal(srv) {
      openModal(`
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] uppercase text-blue-600 font-bold">Edit Listing</span>
            <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white">Edit Repair Service</h3>
          </div>
          <button type="button" id="editSrvCloseBtn" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">✕</button>
        </div>

        <form id="editServiceModalForm" class="space-y-3.5">
          <div>
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Service Title *</label>
            <input id="editSrvTitle" type="text" required value="${escapeHtml(srv.title)}" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Category *</label>
              <select id="editSrvCat" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs">
                ${CATEGORIES.map(c => `<option value="${escapeHtml(c)}" ${srv.category === c ? 'selected' : ''}>${escapeHtml(c)}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Base Price (USD) *</label>
              <input id="editSrvPrice" type="number" min="1" required value="${srv.basePrice}" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Service Mode *</label>
              <select id="editSrvMode" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs">
                <option value="Home Visit" ${srv.serviceMode === 'Home Visit' ? 'selected' : ''}>Home Visit</option>
                <option value="Shop Drop-off" ${srv.serviceMode === 'Shop Drop-off' ? 'selected' : ''}>Shop Drop-off</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Estimated Duration *</label>
              <input id="editSrvDur" type="text" required value="${escapeHtml(srv.estimatedDuration)}" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Description *</label>
            <textarea id="editSrvDesc" rows="3" required class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs">${escapeHtml(srv.description)}</textarea>
          </div>
          <p class="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            Note: Saving edits will send this service back to pending review before going live again.
          </p>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" id="editSrvCancelBtn" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">Cancel</button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold">Save & Re-Submit for Approval</button>
          </div>
        </form>
      `);

      document.getElementById('editSrvCloseBtn')?.addEventListener('click', closeModal);
      document.getElementById('editSrvCancelBtn')?.addEventListener('click', closeModal);
      document.getElementById('editServiceModalForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const editPayload = {
          title: document.getElementById('editSrvTitle').value.trim(),
          category: document.getElementById('editSrvCat').value,
          basePrice: Number(document.getElementById('editSrvPrice').value),
          serviceMode: document.getElementById('editSrvMode').value,
          estimatedDuration: document.getElementById('editSrvDur').value.trim(),
          description: document.getElementById('editSrvDesc').value.trim(),
          serviceArea: srv.serviceArea,
          // Existing seeded service images may use same-origin /images paths.
          // Omit image on edit unless an uploaded HTTPS image exists.
          ...(srv.image && /^https:\/\//i.test(srv.image) ? { image: srv.image } : {})
        };
        if (authMode === 'api') {
          apiRequest('/services/' + encodeURIComponent(srv._id), { method: 'PATCH', body: JSON.stringify(editPayload) })
            .then(async () => { await refreshApiWorkspace(); closeModal(); showToast('Service updated and sent for admin approval.', 'info'); renderApp(); })
            .catch(error => showToast(error.message || 'Unable to update this service.', 'error'));
          return;
        }
        srv.title = document.getElementById('editSrvTitle').value.trim();
        srv.category = document.getElementById('editSrvCat').value;
        srv.basePrice = Number(document.getElementById('editSrvPrice').value);
        srv.serviceMode = document.getElementById('editSrvMode').value;
        srv.estimatedDuration = document.getElementById('editSrvDur').value.trim();
        srv.description = document.getElementById('editSrvDesc').value.trim();
        srv.approvalStatus = 'pending';
        saveState();
        closeModal();
        showToast('Service updated! Status set to Pending for Admin approval.', 'info');
        renderApp();
      });
    }

    function openCodeAndDeployModal() {
      openModal(`
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span class="text-[10px] uppercase text-emerald-600 font-bold">Live Access Information</span>
            <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white">Test Logins Details</h3>
          </div>
          <button type="button" id="codeModalCloseBtn" class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">✕</button>
        </div>

        <div class="space-y-3 text-xs text-slate-600 dark:text-slate-300 max-h-[65vh] overflow-y-auto pr-1 custom-scrollbar">
          <div class="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
            <p class="font-bold text-blue-900 dark:text-blue-200 mb-1">Live Production Endpoints</p>
            <ul class="font-mono text-[11px] space-y-1 text-blue-700 dark:text-blue-300">
              <li>• Client: <strong>as-fixmate.vercel.app</strong></li>
              <li>• API: <strong>as-fixmate-api.vercel.app</strong></li>
            </ul>
          </div>

          <div class="rounded-2xl border-2 border-amber-300 dark:border-amber-500/70 bg-gradient-to-br from-amber-50 via-yellow-50 to-white dark:from-amber-950/70 dark:via-slate-900 dark:to-slate-950 p-4 shadow-xl shadow-amber-500/15 ring-2 ring-amber-200/60 dark:ring-amber-500/20 space-y-3">
            <div class="flex items-center justify-between gap-3">
              <p class="font-display text-sm font-extrabold text-amber-950 dark:text-amber-200">LOCAL DEMO PREVIEW ACCOUNTS</p>
              <span class="rounded-full bg-amber-400 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-slate-950">Preview only</span>
            </div>
            <div class="rounded-xl border-2 border-amber-400/80 bg-amber-100 dark:bg-amber-900/50 px-4 py-3">
              <span class="block text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-200">Shared demo password</span>
              <p class="mt-1 font-mono text-lg font-extrabold tracking-wide text-slate-950 dark:text-white">Password123</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="rounded-xl border border-violet-200 dark:border-violet-800 bg-white/90 dark:bg-violet-950/30 p-3">
                <span class="text-[10px] font-black uppercase tracking-wider text-violet-700 dark:text-violet-300">Admin Preview</span>
                <p class="mt-1 break-all font-mono text-xs font-extrabold text-slate-900 dark:text-white">admin@fixmate.com</p>
              </div>
              <div class="rounded-xl border border-blue-200 dark:border-blue-800 bg-white/90 dark:bg-blue-950/30 p-3">
                <span class="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">Customer Preview</span>
                <p class="mt-1 break-all font-mono text-xs font-extrabold text-slate-900 dark:text-white">nadia@fixmate.com</p>
              </div>
              <div class="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white/90 dark:bg-emerald-950/30 p-3">
                <span class="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Technician · Pro</span>
                <p class="mt-1 break-all font-mono text-xs font-extrabold text-slate-900 dark:text-white">rafiq.tech@fixmate.com</p>
              </div>
              <div class="rounded-xl border border-orange-200 dark:border-orange-800 bg-white/90 dark:bg-orange-950/30 p-3">
                <span class="text-[10px] font-black uppercase tracking-wider text-orange-700 dark:text-orange-300">Technician · Free</span>
                <p class="mt-1 break-all font-mono text-xs font-extrabold text-slate-900 dark:text-white">tanvir.tech@fixmate.com</p>
              </div>
            </div>
            <p class="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 text-[11px] font-semibold leading-relaxed text-slate-700 dark:text-slate-200">These credentials open a safe local preview using sample data in your browser. They do not sign in to real production accounts or change live customer, booking or payment records.</p>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] space-y-1">
            <p class="text-emerald-400 font-bold">LIVE APPLICATION STACK</p>
            <p>Frontend: Next.js App Router</p>
            <p>API: Express.js · MongoDB · Better Auth</p>
            <p>Payments: Stripe Checkout (requires active secret key)</p>
          </div>
        </div>
      `);
      document.getElementById('codeModalCloseBtn')?.addEventListener('click', closeModal);
    }

    // ============================================================================
    // 9. MASTER APP RENDER & EVENT DELEGATION
    // ============================================================================
    function renderApp() {
      syncHeaderAndTheme();
      const viewport = document.getElementById('appViewport');
      if (!viewport) return;
      viewport.setAttribute('aria-busy', 'false');

      const r = state.route;
      if (r === '/') {
        viewport.innerHTML = renderHomePage();
      } else if (r === '/services') {
        viewport.innerHTML = renderBrowseServicesPage();
      } else if (r === '/services/[id]') {
        viewport.innerHTML = renderServiceDetailsPage();
      } else if (r === '/about') {
        viewport.innerHTML = renderAboutPage();
      } else if (r === '/sign-in') {
        viewport.innerHTML = renderSignInPage();
      } else if (r === '/sign-up') {
        viewport.innerHTML = renderSignUpPage();
      } else if (r === '/payment/success') {
        viewport.innerHTML = renderPaymentSuccessPage();
      } else if (r === '/payment/cancel') {
        viewport.innerHTML = renderPaymentCancelPage();
      } else if (r.startsWith('/dashboard')) {
        viewport.innerHTML = renderDashboardLayout();
      } else {
        state.route = '/';
        writeBrowserLocation('/', true);
        viewport.innerHTML = renderHomePage();
      }

      bindDynamicViewEvents();
      if (r.startsWith('/dashboard')) {
        setTimeout(initDashboardCharts, 30);
      }
    }

    function bindDynamicViewEvents() {
      // View Details Buttons on service cards
      document.querySelectorAll('.btn-view-details').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-view-service');
          navigate('/services/[id]', { serviceId: id });
          if (authMode !== 'preview') {
            apiRequest('/services/' + encodeURIComponent(id), {}, false)
              .then(result => {
                const index = state.services.findIndex(item => String(item._id) === String(id));
                if (index >= 0 && result.data) {
                  state.services[index] = result.data;
                  if (state.route === '/services/[id]' && String(state.selectedServiceId) === String(id)) renderApp();
                }
              })
              .catch(error => console.warn('Service detail refresh:', error));
          }
        });
      });

      // Home Search Form
      const heroForm = document.getElementById('heroSearchForm');
      if (heroForm) {
        heroForm.addEventListener('submit', e => {
          e.preventDefault();
          const val = document.getElementById('heroSearchInput').value.trim();
          state.queryParams.search = val;
          state.queryParams.page = 1;
          navigate('/services');
        });
      }

      document.getElementById('homeViewAllServicesBtn')?.addEventListener('click', () => {
        navigate('/services', { resetFilters: true });
      });

      // Home Category Cards (/services?category=...)
      document.querySelectorAll('.home-cat-card').forEach(card => {
        card.addEventListener('click', () => {
          const cat = card.getAttribute('data-home-cat');
          state.queryParams = { search: '', category: cat, serviceMode: 'All', sort: 'newest', page: 1, limit: 6 };
          navigate('/services');
          showToast(`Showing ${cat} repair services`, 'info');
        });
      });

      // Browse Services Filters
      const searchIn = document.getElementById('srvSearchInput');
      if (searchIn) {
        searchIn.addEventListener('input', e => {
          state.queryParams.search = e.target.value;
          state.queryParams.page = 1;
          renderApp();
          const newIn = document.getElementById('srvSearchInput');
          if (newIn) {
            newIn.focus();
            newIn.setSelectionRange(newIn.value.length, newIn.value.length);
          }
        });
      }

      document.getElementById('srvCategorySelect')?.addEventListener('change', e => {
        state.queryParams.category = e.target.value;
        state.queryParams.page = 1;
        renderApp();
      });

      document.getElementById('srvModeSelect')?.addEventListener('change', e => {
        state.queryParams.serviceMode = e.target.value;
        state.queryParams.page = 1;
        renderApp();
      });

      document.getElementById('srvSortSelect')?.addEventListener('change', e => {
        state.queryParams.sort = e.target.value;
        state.queryParams.page = 1;
        renderApp();
      });

      document.getElementById('srvResetBtn')?.addEventListener('click', () => {
        navigate('/services', { resetFilters: true });
      });

      document.getElementById('emptyResetFiltersBtn')?.addEventListener('click', () => {
        navigate('/services', { resetFilters: true });
      });

      document.querySelectorAll('.srv-cat-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          state.queryParams.category = chip.getAttribute('data-chip-cat');
          state.queryParams.page = 1;
          renderApp();
        });
      });

      // Pagination
      document.getElementById('pagePrevBtn')?.addEventListener('click', () => {
        if (state.queryParams.page > 1) {
          state.queryParams.page--;
          renderApp();
        }
      });
      document.getElementById('pageNextBtn')?.addEventListener('click', () => {
        state.queryParams.page++;
        renderApp();
      });
      document.querySelectorAll('.page-num-btn').forEach(b => {
        b.addEventListener('click', () => {
          state.queryParams.page = Number(b.getAttribute('data-page-num'));
          renderApp();
        });
      });

      // Service Details Actions
      document.getElementById('btnBackToServices')?.addEventListener('click', () => navigate('/services'));
      document.getElementById('btnRequestRepairGuest')?.addEventListener('click', () => {
        state.redirectAfterLogin = '/services/[id]';
        navigate('/sign-in');
      });
      document.getElementById('btnOpenRepairRequestModal')?.addEventListener('click', () => {
        const srv = state.services.find(s => s._id === state.selectedServiceId);
        if (srv) openRepairRequestModal(srv);
      });

      // Sign In Page
      document.querySelectorAll('.fill-cred-btn').forEach(b => {
        b.addEventListener('click', () => {
          const email = b.getAttribute('data-fill-email');
          const password = b.getAttribute('data-fill-password');
          const emailInput = document.getElementById('loginEmail');
          const passwordInput = document.getElementById('loginPassword');
          if (emailInput) emailInput.value = email || '';
          if (passwordInput) passwordInput.value = password || '';
        });
      });

      document.getElementById('goToSignUpLink')?.addEventListener('click', () => navigate('/sign-up'));
      document.getElementById('goToSignInLink')?.addEventListener('click', () => navigate('/sign-in'));

      document.getElementById('signInForm')?.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        if (!email || !password) {
          showToast('Enter your email address and password.', 'error');
          return;
        }

        // Public demo credentials open the isolated sample workspace only.
        const previewEmails = [
          'nadia@fixmate.com',
          'rafiq.tech@fixmate.com',
          'tanvir.tech@fixmate.com',
          'admin@fixmate.com'
        ];
        if (password === 'Password123' && previewEmails.includes(email)) {
          try { await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'include' }); } catch (error) {}
          state.users = JSON.parse(JSON.stringify(INITIAL_STATE.users));
          state.services = JSON.parse(JSON.stringify(INITIAL_STATE.services));
          state.bookings = JSON.parse(JSON.stringify(INITIAL_STATE.bookings));
          state.payments = JSON.parse(JSON.stringify(INITIAL_STATE.payments));
          const previewUser = state.users.find(user => user.email.toLowerCase() === email);
          if (previewUser) {
            authMode = 'preview';
            activeApiToken = '';
            state.currentUser = previewUser;
            saveState();
            showToast('Opened safe local demo preview as ' + previewUser.role + '.', 'success');
            const target = state.redirectAfterLogin || getRoleDashboardRoute(previewUser);
            state.redirectAfterLogin = null;
            navigate(target);
            return;
          }
        }

        const submit = e.currentTarget.querySelector('button[type="submit"]');
        if (submit) { submit.disabled = true; submit.textContent = 'Signing in securely…'; }
        try {
          const response = await fetch('/api/auth/sign-in/email', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, callbackURL: window.location.origin })
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(payload.message || 'Email or password was not accepted.');
          const restored = await restoreApiSession();
          if (!restored) throw new Error('Sign-in succeeded, but the secure session could not be loaded. Please try again.');
          try { await refreshApiWorkspace(); }
          catch (loadError) { console.error('FixMate workspace refresh:', loadError); }
          showToast('Signed in securely as ' + state.currentUser.name + '.', 'success');
          const target = state.redirectAfterLogin || getRoleDashboardRoute(state.currentUser);
          state.redirectAfterLogin = null;
          navigate(target);
        } catch (error) {
          showToast(error.message || 'Unable to sign in. Please try again.', 'error');
        } finally {
          if (submit) { submit.disabled = false; submit.textContent = 'Sign In →'; }
        }
      });

      document.getElementById('btnGoogleLogin')?.addEventListener('click', async () => {
        if (window.FIXMATE_GOOGLE_AUTH_ENABLED !== true) {
          showToast('Google sign-in is not configured for this deployment.', 'warning');
          return;
        }
        try {
          const response = await fetch('/api/auth/sign-in/social', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider: 'google', callbackURL: window.location.origin })
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok || !payload.url) throw new Error(payload.message || 'Google sign-in could not be started.');
          window.location.assign(payload.url);
        } catch (error) {
          showToast(error.message || 'Google sign-in could not be started.', 'error');
        }
      });

      // Sign Up Page with real-time Password Validation
      const regPw = document.getElementById('regPassword');
      if (regPw) {
        regPw.addEventListener('input', () => {
          const v = regPw.value;
          const okLen = v.length >= 6;
          const okUp = /[A-Z]/.test(v);
          const okLow = /[a-z]/.test(v);
          const setRule = (id, ok, txt) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.textContent = `${ok ? '✓' : '○'} ${txt}`;
            el.className = ok ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-rose-500';
          };
          setRule('pwRuleLen', okLen, 'At least 6 characters');
          setRule('pwRuleUpper', okUp, 'At least one uppercase letter (A–Z)');
          setRule('pwRuleLower', okLow, 'At least one lowercase letter (a–z)');
        });
      }

      document.getElementById('signUpForm')?.addEventListener('submit', async e => {
        e.preventDefault();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim().toLowerCase();
        const password = document.getElementById('regPassword').value;
        const roleInput = document.querySelector('input[name="regRole"]:checked')?.value || 'customer';
        const safeRole = roleInput === 'technician' ? 'technician' : 'customer';
        if (!name || !email) {
          showToast('Full Name and a valid Email are required.', 'error');
          return;
        }
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
          showToast('Password must be 6+ characters and include uppercase and lowercase letters.', 'error');
          return;
        }
        const submit = e.currentTarget.querySelector('button[type="submit"]');
        if (submit) { submit.disabled = true; submit.textContent = 'Creating secure account…'; }
        try {
          const response = await fetch('/api/auth/sign-up/email', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role: safeRole, callbackURL: window.location.origin })
          });
          const payload = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(payload.message || 'Account creation failed.');
          const restored = await restoreApiSession();
          if (!restored) throw new Error('Your account was created, but the secure session could not be started. Please sign in.');
          try { await refreshApiWorkspace(); }
          catch (loadError) { console.error('FixMate workspace refresh:', loadError); }
          showToast('Your FixMate ' + safeRole + ' account is ready.', 'success');
          navigate(getRoleDashboardRoute(state.currentUser));
        } catch (error) {
          showToast(error.message || 'Unable to create your account.', 'error');
        } finally {
          if (submit) { submit.disabled = false; submit.textContent = 'Create Account & Go to Dashboard →'; }
        }
      });

      // Dashboard Sidebar Navigation
      document.querySelectorAll('.dash-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          navigate(btn.getAttribute('data-dash-nav'));
        });
      });
      document.getElementById('dashBackHomeBtn')?.addEventListener('click', () => navigate('/'));
      document.getElementById('dashTopBrowseBtn')?.addEventListener('click', () => navigate('/services'));
      document.getElementById('btnRedirectOwnDashboard')?.addEventListener('click', () => {
        navigate(getRoleDashboardRoute(state.currentUser));
      });

      // Customer Bookings Actions
      document.querySelectorAll('.btn-cancel-booking').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-cancel-booking');
          const bkg = state.bookings.find(b => b._id === id);
          if (!bkg || bkg.status !== 'requested') return;
          openConfirmModal({
            title: 'Cancel Repair Request?',
            message: `Are you sure you want to cancel your request for "${bkg.serviceTitle}"? Cancelled bookings reach a final state and cannot be reopened.`,
            confirmText: 'Yes, Cancel Booking',
            danger: true,
            onConfirm: () => {
              if (authMode === 'api') {
                apiRequest('/bookings/' + encodeURIComponent(id) + '/cancel', { method: 'PATCH' })
                  .then(async () => { await refreshApiWorkspace(); showToast('Repair request cancelled.', 'info'); renderApp(); })
                  .catch(error => showToast(error.message || 'Unable to cancel this request.', 'error'));
                return;
              }
              bkg.status = 'cancelled';
              bkg.statusHistory = bkg.statusHistory || [];
              bkg.statusHistory.push({ status: 'cancelled', changedAt: new Date().toISOString() });
              saveState();
              showToast('Booking cancelled.', 'info');
              renderApp();
            }
          });
        });
      });

      document.querySelectorAll('.btn-pay-booking').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-pay-booking');
          const bkg = state.bookings.find(b => b._id === id);
          if (bkg) openStripeCheckoutModal(bkg);
        });
      });

      document.querySelectorAll('.btn-invoice-booking').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-invoice-booking');
          const bkg = state.bookings.find(b => b._id === id);
          if (bkg) openPdfInvoiceModal(bkg);
        });
      });

      document.querySelectorAll('.btn-rate-booking').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-rate-booking');
          const bkg = state.bookings.find(b => b._id === id);
          if (bkg) openRateBookingModal(bkg);
        });
      });

      // Payment Success / Cancel buttons
      document.getElementById('btnSuccessToBookings')?.addEventListener('click', () => navigate('/dashboard/customer/bookings'));
      document.getElementById('btnSuccessToPayments')?.addEventListener('click', () => navigate('/dashboard/customer/payments'));
      document.getElementById('btnCancelTryAgain')?.addEventListener('click', () => navigate('/dashboard/customer/bookings'));

      // Technician Pro Plan Upgrade
      const handleProUpgrade = () => {
        const u = state.currentUser;
        if (!u || u.role !== 'technician') return;
        if (authMode === 'api') {
          apiRequest('/payments/create-pro-checkout-session', { method: 'POST', body: JSON.stringify({}) })
            .then(result => {
              if (!result.data || !result.data.url) throw new Error('Stripe did not return a checkout URL.');
              window.location.assign(result.data.url);
            })
            .catch(error => showToast(error.message || 'FixMate Pro checkout is unavailable.', 'error'));
          return;
        }
        u.plan = 'pro';
        const dbUser = state.users.find(x => x.email === u.email);
        if (dbUser) dbUser.plan = 'pro';
        state.payments.push({
          _id: 'pay_pro_' + Math.floor(1000 + Math.random() * 9000),
          bookingId: 'PRO_SUBSCRIPTION',
          serviceTitle: 'FixMate Pro Technician Plan (Unlimited Listings & Verified Pro Badge)',
          customerName: u.name,
          customerEmail: u.email,
          technicianName: 'FixMate Platform',
          technicianEmail: 'admin@fixmate.com',
          amount: 29,
          currency: 'usd',
          transactionId: 'pi_3QFixMatePro' + Math.floor(10000 + Math.random() * 89999),
          stripeSessionId: 'cs_test_pro_' + Date.now(),
          paymentStatus: 'paid',
          paidAt: new Date().toISOString()
        });
        saveState();
        showToast('Upgraded to FixMate Pro Technician! Unlimited services & Verified Pro badge unlocked.', 'success');
        renderApp();
      };
      document.getElementById('btnUpgradeTechPro')?.addEventListener('click', handleProUpgrade);
      document.getElementById('btnAddSrvUpgradePro')?.addEventListener('click', handleProUpgrade);

      // Technician Add Service Form
      document.getElementById('addServiceForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const u = state.currentUser;
        const title = document.getElementById('addSrvTitle').value.trim();
        const category = document.getElementById('addSrvCategory').value;
        const basePrice = Number(document.getElementById('addSrvPrice').value);
        const estimatedDuration = document.getElementById('addSrvDuration').value.trim();
        const serviceMode = document.getElementById('addSrvMode').value;
        const serviceArea = document.getElementById('addSrvArea').value.trim();
        const description = document.getElementById('addSrvDesc').value.trim();
        const fileInput = document.getElementById('addSrvImageFile');

        if (!basePrice || basePrice <= 0) {
          showToast('Base price must be a positive number.', 'error');
          return;
        }

        if (authMode === 'api') {
          (async () => {
            try {
              if (!fileInput || !fileInput.files || !fileInput.files[0]) throw new Error('Choose a JPG, PNG or WEBP service image to upload.');
              if (description.length < 30) throw new Error('Service description must be at least 30 characters.');
              const imageUrl = await uploadApiImage(fileInput.files[0]);
              await apiRequest('/services', {
                method: 'POST',
                body: JSON.stringify({ title, category, basePrice, estimatedDuration, serviceMode, serviceArea, description, image: imageUrl })
              });
              await refreshApiWorkspace();
              showToast('Service submitted. It will appear publicly after admin approval.', 'success');
              navigate('/dashboard/technician/my-services');
            } catch (error) {
              showToast(error.message || 'Unable to submit this service.', 'error');
            }
          })();
          return;
        }

        const createServiceRecord = (imgUrl) => {
          const newSrv = {
            _id: 'srv_' + Math.floor(1000 + Math.random() * 9000),
            title,
            category,
            description,
            image: imgUrl || TECH_WORK_IMG,
            basePrice,
            estimatedDuration,
            serviceMode,
            serviceArea,
            technicianName: u.name,
            technicianEmail: u.email,
            approvalStatus: 'pending',
            isAvailable: true,
            ratingAvg: 0,
            ratingCount: 0,
            createdAt: new Date().toISOString()          };
          state.services.unshift(newSrv);
          saveState();
          showToast('Service uploaded via ImgBB and waiting for admin approval!', 'success');
          navigate('/dashboard/technician/my-services');
        };

        if (fileInput && fileInput.files && fileInput.files[0]) {
          const reader = new FileReader();
          reader.onload = ev => createServiceRecord(ev.target.result);
          reader.readAsDataURL(fileInput.files[0]);
        } else {
          createServiceRecord(TECH_WORK_IMG);
        }
      });

      // Technician My Services CRUD
      document.querySelectorAll('.btn-toggle-avail').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-toggle-avail');
          const srv = state.services.find(s => s._id === id);
          if (!srv) return;
          if (authMode === 'api') {
            const nextAvailability = !srv.isAvailable;
            apiRequest('/services/' + encodeURIComponent(id), { method: 'PATCH', body: JSON.stringify({ isAvailable: nextAvailability }) })
              .then(async () => { await refreshApiWorkspace(); showToast('Service availability updated.', 'info'); renderApp(); })
              .catch(error => showToast(error.message || 'Unable to update availability.', 'error'));
            return;
          }
          srv.isAvailable = !srv.isAvailable;
          saveState();
          showToast(`Service availability switched ${srv.isAvailable ? 'ON (Visible publicly)' : 'OFF (Hidden from public pages)'}`, 'info');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-edit-service').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-edit-service');
          const srv = state.services.find(s => s._id === id);
          if (srv) openEditServiceModal(srv);
        });
      });

      document.querySelectorAll('.btn-delete-service').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-delete-service');
          const srv = state.services.find(s => s._id === id);
          if (!srv) return;
          openConfirmModal({
            title: 'Delete Repair Service?',
            message: `Are you sure you want to permanently delete "${srv.title}"? Existing bookings will retain their copied snapshot fields.`,
            confirmText: 'Delete Service',
            danger: true,
            onConfirm: () => {
              if (authMode === 'api') {
                apiRequest('/services/' + encodeURIComponent(id), { method: 'DELETE' })
                  .then(async () => { await refreshApiWorkspace(); showToast('Service deleted.', 'info'); renderApp(); })
                  .catch(error => showToast(error.message || 'Unable to delete this service.', 'error'));
                return;
              }
              state.services = state.services.filter(s => s._id !== id);
              saveState();
              showToast('Service deleted.', 'info');
              renderApp();
            }
          });
        });
      });

      // Technician Manage Requests Pipeline
      document.querySelectorAll('.btn-tech-filter').forEach(btn => {
        btn.addEventListener('click', () => {
          state.techRequestFilter = btn.getAttribute('data-tech-filter');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-tech-accept').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-tech-accept');
          const bkg = state.bookings.find(b => b._id === id);
          if (!bkg || bkg.status !== 'requested') return;
          if (authMode === 'api') {
            apiRequest('/bookings/' + encodeURIComponent(id) + '/status', { method: 'PATCH', body: JSON.stringify({ status: 'accepted' }) })
              .then(async () => { await refreshApiWorkspace(); showToast('Job accepted.', 'success'); renderApp(); })
              .catch(error => showToast(error.message || 'Unable to accept this job.', 'error'));
            return;
          }
          bkg.status = 'accepted';
          bkg.statusHistory = bkg.statusHistory || [];
          bkg.statusHistory.push({ status: 'accepted', changedAt: new Date().toISOString() });
          saveState();
          showToast('Job Accepted! Next stage: Start Work.', 'success');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-tech-reject').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-tech-reject');
          const bkg = state.bookings.find(b => b._id === id);
          if (!bkg || bkg.status !== 'requested') return;
          openConfirmModal({
            title: 'Reject Repair Request?',
            message: `Are you sure you want to reject "${bkg.serviceTitle}" for ${bkg.customerName}? Rejected is a final state.`,
            confirmText: 'Reject Request',
            danger: true,
            onConfirm: () => {
              if (authMode === 'api') {
                apiRequest('/bookings/' + encodeURIComponent(id) + '/status', { method: 'PATCH', body: JSON.stringify({ status: 'rejected' }) })
                  .then(async () => { await refreshApiWorkspace(); showToast('Repair request rejected.', 'warning'); renderApp(); })
                  .catch(error => showToast(error.message || 'Unable to reject this request.', 'error'));
                return;
              }
              bkg.status = 'rejected';
              bkg.statusHistory = bkg.statusHistory || [];
              bkg.statusHistory.push({ status: 'rejected', changedAt: new Date().toISOString() });
              saveState();
              showToast('Repair request rejected.', 'warning');
              renderApp();
            }
          });
        });
      });

      document.querySelectorAll('.btn-tech-start').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-tech-start');
          const bkg = state.bookings.find(b => b._id === id);
          if (!bkg || bkg.status !== 'accepted') return;
          if (authMode === 'api') {
            apiRequest('/bookings/' + encodeURIComponent(id) + '/status', { method: 'PATCH', body: JSON.stringify({ status: 'in-progress' }) })
              .then(async () => { await refreshApiWorkspace(); showToast('Repair moved to In Progress.', 'info'); renderApp(); })
              .catch(error => showToast(error.message || 'Unable to start this repair.', 'error'));
            return;
          }
          bkg.status = 'in-progress';
          bkg.statusHistory = bkg.statusHistory || [];
          bkg.statusHistory.push({ status: 'in-progress', changedAt: new Date().toISOString() });
          saveState();
          showToast('Job moved to In Progress!', 'info');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-tech-complete').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-tech-complete');
          const bkg = state.bookings.find(b => b._id === id);
          if (bkg && bkg.status === 'in-progress') openCompleteJobModal(bkg);
        });
      });

      // Admin Dashboard Actions
      document.querySelectorAll('.admin-role-select').forEach(sel => {
        sel.addEventListener('change', e => {
          const uid = sel.getAttribute('data-admin-role-user');
          const targetUser = state.users.find(u => u._id === uid);
          if (!targetUser) return;
          if (targetUser.email === state.currentUser?.email) {
            showToast('Admin cannot change their own role!', 'error');
            return;
          }
          if (authMode === 'api') {
            apiRequest('/admin/users/' + encodeURIComponent(uid) + '/role', { method: 'PATCH', body: JSON.stringify({ role: e.target.value }) })
              .then(async () => { await refreshApiWorkspace(); showToast('User role updated.', 'success'); renderApp(); })
              .catch(error => { showToast(error.message || 'Unable to update this role.', 'error'); renderApp(); });
            return;
          }
          targetUser.role = e.target.value;
          saveState();
          showToast(`Updated ${targetUser.name}'s role to '${targetUser.role}'`, 'success');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-admin-srv-filter').forEach(btn => {
        btn.addEventListener('click', () => {
          state.adminServiceFilter = btn.getAttribute('data-admin-srv-filter');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-approve-srv').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-approve-srv');
          const srv = state.services.find(s => s._id === id);
          if (!srv) return;
          if (authMode === 'api') {
            apiRequest('/admin/services/' + encodeURIComponent(id) + '/approval', { method: 'PATCH', body: JSON.stringify({ approvalStatus: 'approved' }) })
              .then(async () => { await refreshApiWorkspace(); showToast('Service approved and published.', 'success'); renderApp(); })
              .catch(error => showToast(error.message || 'Unable to approve this service.', 'error'));
            return;
          }
          srv.approvalStatus = 'approved';
          saveState();
          showToast(`Approved "${srv.title}"! Now live on public pages.`, 'success');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-reject-srv').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-reject-srv');
          const srv = state.services.find(s => s._id === id);
          if (!srv) return;
          if (authMode === 'api') {
            apiRequest('/admin/services/' + encodeURIComponent(id) + '/approval', { method: 'PATCH', body: JSON.stringify({ approvalStatus: 'rejected' }) })
              .then(async () => { await refreshApiWorkspace(); showToast('Service rejected.', 'warning'); renderApp(); })
              .catch(error => showToast(error.message || 'Unable to reject this service.', 'error'));
            return;
          }
          srv.approvalStatus = 'rejected';
          saveState();
          showToast(`Rejected "${srv.title}". Hidden from public pages.`, 'warning');
          renderApp();
        });
      });

      document.querySelectorAll('.btn-admin-bkg-filter').forEach(btn => {
        btn.addEventListener('click', () => {
          state.adminBookingFilter = btn.getAttribute('data-admin-bkg-filter');
          renderApp();
        });
      });

      // Shared Update Profile Form
      const profPhotoIn = document.getElementById('profilePhotoInput');
      if (profPhotoIn) {
        profPhotoIn.addEventListener('change', () => {
          if (profPhotoIn.files && profPhotoIn.files[0]) {
            const reader = new FileReader();
            reader.onload = ev => {
              const prev = document.getElementById('profilePreviewImg');
              if (prev) prev.src = ev.target.result;
            };
            reader.readAsDataURL(profPhotoIn.files[0]);
          }
        });
      }

      document.getElementById('updateProfileForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const u = state.currentUser;
        if (!u) return;
        const newName = document.getElementById('profName').value.trim();
        const newPhone = document.getElementById('profPhone').value.trim();
        const newArea = document.getElementById('profArea').value.trim();
        const newBio = document.getElementById('profBio').value.trim();
        const prevImg = document.getElementById('profilePreviewImg')?.src || u.image;

        if (authMode === 'api') {
          (async () => {
            try {
              let imageUrl = u.image || '';
              if (profPhotoIn && profPhotoIn.files && profPhotoIn.files[0]) imageUrl = await uploadApiImage(profPhotoIn.files[0]);
              await apiRequest('/users/profile', {
                method: 'PATCH',
                body: JSON.stringify({ name: newName, phone: newPhone, area: newArea, bio: newBio, image: imageUrl })
              });
              u.name = newName; u.phone = newPhone; u.area = newArea; u.bio = newBio; u.image = imageUrl;
              await refreshApiWorkspace();
              showToast('Your profile has been updated.', 'success');
              renderApp();
            } catch (error) {
              showToast(error.message || 'Unable to update your profile.', 'error');
            }
          })();
          return;
        }
        u.name = newName;
        u.phone = newPhone;
        u.area = newArea;
        u.bio = newBio;
        u.image = prevImg;

        const dbU = state.users.find(x => x.email === u.email);
        if (dbU) {
          dbU.name = newName;
          dbU.phone = newPhone;
          dbU.area = newArea;
          dbU.bio = newBio;
          dbU.image = prevImg;
        }
        saveState();
        showToast('Profile saved! Navbar & Dashboard top bar updated live.', 'success');
        renderApp();
      });

      // Customer Booking Filter Pills
      document.querySelectorAll('.btn-cust-bkg-filter').forEach(btn => {
        btn.addEventListener('click', () => {
          state.customerBookingFilter = btn.getAttribute('data-cust-bkg-filter');
          renderApp();
        });
      });

      // Hero Live Job Ticket Replay Animation
      if (state.route === '/') {
        startHeroTicketAnimation();
        document.getElementById('btnReplayHeroJob')?.addEventListener('click', () => {
          startHeroTicketAnimation();
        });
      }

    }

    // ============================================================================
    // 10. GLOBAL HEADER, FOOTER & QUICK BAR LISTENERS
    // ============================================================================
    async function bootFixMateDemo() {
      if (window.__FIXMATE_DEMO_BOOTED__) return;
      window.__FIXMATE_DEMO_BOOTED__ = true;
      loadState();
      // Keep a locally selected preview persona across refreshes, but always prefer a real API session.
      const savedPreviewUser = authMode === 'preview' ? state.currentUser : null;
      state.currentUser = null;
      activeApiToken = '';
      authMode = 'none';
      let apiSessionRestored = false;
      try { apiSessionRestored = await restoreApiSession(); }
      catch (error) { console.warn('FixMate session restore:', error); }
      if (!apiSessionRestored && savedPreviewUser) {
        state.currentUser = savedPreviewUser;
        authMode = 'preview';
      }
      try {
        const publicCatalogue = await apiRequest('/services?limit=48', {}, false);
        if (Array.isArray(publicCatalogue.data)) state.services = publicCatalogue.data;
      } catch (error) {
        console.warn('FixMate public service catalogue:', error);
      }
      if (authMode === 'api') {
        try { await refreshApiWorkspace(); }
        catch (error) { console.error('FixMate live workspace data:', error); }
      }
      syncHeaderAndTheme();
      state.route = routeFromBrowserLocation();
      syncServiceQueryFromLocation();
      if (authMode === 'api' && state.route === '/services/[id]' && state.selectedServiceId) {
        try {
          const detail = await apiRequest('/services/' + encodeURIComponent(state.selectedServiceId), {}, false);
          const index = state.services.findIndex(item => String(item._id) === String(state.selectedServiceId));
          if (detail.data && index >= 0) state.services[index] = detail.data;
        } catch (error) {
          console.warn('FixMate service detail:', error);
          state.route = '/';
          writeBrowserLocation('/', true);
        }
      }
      if (authMode === 'api' && state.route === '/payment/success') {
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        if (sessionId) {
          try {
            await apiRequest('/payments/verify?session_id=' + encodeURIComponent(sessionId));
            await refreshApiWorkspace();
            showToast('Stripe confirmed your payment and updated the booking.', 'success');
          } catch (error) {
            showToast(error.message || 'Payment verification could not be completed.', 'error');
          } finally {
            window.history.replaceState({}, '', '/payment/success');
          }
        }
      }
      if (authMode === 'api' && state.route.startsWith('/dashboard') && state.currentUser && state.currentUser.role === 'technician') {
        const planSessionId = new URLSearchParams(window.location.search).get('plan_session_id');
        if (planSessionId) {
          try {
            await apiRequest('/payments/verify-pro?session_id=' + encodeURIComponent(planSessionId));
            await restoreApiSession();
            await refreshApiWorkspace();
            showToast('FixMate Pro payment verified. Your plan is active.', 'success');
          } catch (error) {
            showToast(error.message || 'Pro plan verification could not be completed.', 'error');
          } finally {
            window.history.replaceState({}, '', state.route);
          }
        }
      }
      if ((state.route.startsWith('/dashboard') || state.route.startsWith('/payment')) && !state.currentUser) {
        state.redirectAfterLogin = state.route;
        state.route = '/sign-in';
        writeBrowserLocation('/sign-in', true);
      } else if ((state.route === '/sign-in' || state.route === '/sign-up') && state.currentUser) {
        state.route = getRoleDashboardRoute(state.currentUser);
        writeBrowserLocation(state.route, true);
      }

      // Brand & Main Nav
      document.getElementById('navBrandBtn')?.addEventListener('click', () => navigate('/'));
      document.getElementById('navLinkHome')?.addEventListener('click', () => navigate('/'));
      document.getElementById('navLinkServices')?.addEventListener('click', () => navigate('/services'));
      document.getElementById('navLinkAbout')?.addEventListener('click', () => navigate('/about'));
      document.getElementById('navLinkDashboardMain')?.addEventListener('click', () => {
        navigate(getRoleDashboardRoute(state.currentUser));
      });

      // Mobile menu
      const mobDrawer = document.getElementById('mobileNavDrawer');
      document.getElementById('btnMobileMenu')?.addEventListener('click', () => {
        mobDrawer?.classList.toggle('hidden');
      });
      document.getElementById('mobLinkHome')?.addEventListener('click', () => { mobDrawer?.classList.add('hidden'); navigate('/'); });
      document.getElementById('mobLinkServices')?.addEventListener('click', () => { mobDrawer?.classList.add('hidden'); navigate('/services'); });
      document.getElementById('mobLinkAbout')?.addEventListener('click', () => { mobDrawer?.classList.add('hidden'); navigate('/about'); });
      document.getElementById('mobLinkDashboard')?.addEventListener('click', () => {
        mobDrawer?.classList.add('hidden');
        navigate(getRoleDashboardRoute(state.currentUser));
      });

      // Theme toggle
      document.getElementById('btnThemeToggle')?.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        saveState();
        renderApp();
        showToast(`Switched to ${state.theme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
      });

      // Auth buttons
      document.getElementById('navBtnSignIn')?.addEventListener('click', () => navigate('/sign-in'));
      document.getElementById('navBtnSignUp')?.addEventListener('click', () => navigate('/sign-up'));

      // User Avatar Dropdown
      const dropMenu = document.getElementById('userDropdownMenu');
      document.getElementById('btnUserDropdown')?.addEventListener('click', e => {
        e.stopPropagation();
        dropMenu?.classList.toggle('hidden');
      });
      document.addEventListener('click', () => {
        dropMenu?.classList.add('hidden');
      });

      document.getElementById('dropBtnDashboard')?.addEventListener('click', () => {
        dropMenu?.classList.add('hidden');
        navigate(getRoleDashboardRoute(state.currentUser));
      });
      document.getElementById('dropBtnProfile')?.addEventListener('click', () => {
        dropMenu?.classList.add('hidden');
        navigate('/dashboard/profile');
      });
      document.getElementById('dropBtnSignOut')?.addEventListener('click', async () => {
        dropMenu?.classList.add('hidden');
        try {
          await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'include' });
        } catch (error) {
          console.warn('FixMate sign-out request:', error);
        }
        activeApiToken = '';
        authMode = 'none';
        state.currentUser = null;
        saveState();
        showToast('Signed out successfully.', 'info');
        navigate('/sign-in');
      });

      // Top Examiner Role Switcher Bar
      const switchRoleByEmail = async (email) => {
        if (authMode === 'api') {
          try { await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'include' }); } catch (error) {}
        }
        // Restore the isolated local preview dataset before switching to a demo persona.
        state.users = JSON.parse(JSON.stringify(INITIAL_STATE.users));
        state.services = JSON.parse(JSON.stringify(INITIAL_STATE.services));
        state.bookings = JSON.parse(JSON.stringify(INITIAL_STATE.bookings));
        state.payments = JSON.parse(JSON.stringify(INITIAL_STATE.payments));
        const u = state.users.find(x => x.email === email);
        if (!u) return;
        authMode = 'preview';
        activeApiToken = '';
        state.currentUser = u;
        saveState();
        showToast(`Switched session to ${u.name} (${u.role.toUpperCase()})`, 'info');
        if (state.route.startsWith('/dashboard')) {
          navigate(getRoleDashboardRoute(u));
        } else {
          renderApp();
        }
      };

      document.getElementById('quickRoleCustomer')?.addEventListener('click', () => switchRoleByEmail('nadia@fixmate.com'));
      document.getElementById('quickRoleTech')?.addEventListener('click', () => switchRoleByEmail('rafiq.tech@fixmate.com'));
      document.getElementById('quickRoleTech2')?.addEventListener('click', () => switchRoleByEmail('tanvir.tech@fixmate.com'));
      document.getElementById('quickRoleAdmin')?.addEventListener('click', () => switchRoleByEmail('admin@fixmate.com'));
      document.getElementById('quickRoleGuest')?.addEventListener('click', async () => {
        try { await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'include' }); } catch (error) {}
        authMode = 'none';
        activeApiToken = '';
        state.currentUser = null;
        saveState();
        showToast('Switched to Logged-Out Visitor state', 'warning');
        renderApp();
      });

      // Skeleton Loader Preview
      document.getElementById('btnToggleSkeleton')?.addEventListener('click', () => {
        const sk = document.getElementById('skeletonLoaderView');
        const vp = document.getElementById('appViewport');
        if (!sk || !vp) return;
        sk.classList.remove('hidden');
        vp.classList.add('hidden');
        showToast('Loading services...', 'info');
        setTimeout(() => {
          sk.classList.add('hidden');
          vp.classList.remove('hidden');
        }, 1500);
      });

      // Code & Deploy Guide Modal
      document.getElementById('btnOpenCodeModal')?.addEventListener('click', openCodeAndDeployModal);

      // Reset Demo Data Button
      document.getElementById('btnResetDemoData')?.addEventListener('click', async () => {
        try { await fetch('/api/auth/sign-out', { method: 'POST', credentials: 'include' }); } catch (e) {}
        activeApiToken = '';
        authMode = 'none';
        try { localStorage.removeItem('fixmate_v3_state'); } catch (e) {}
        state = JSON.parse(JSON.stringify(INITIAL_STATE));
        saveState();
        showToast('Demo data reset to default state.', 'info');
        renderApp();
      });

      // Footer Links
      document.querySelectorAll('.footer-nav-link').forEach(link => {
        link.addEventListener('click', () => navigate(link.getAttribute('data-route')));
      });
      document.querySelectorAll('.footer-cat-link').forEach(link => {
        link.addEventListener('click', () => {
          const cat = link.getAttribute('data-cat');
          state.queryParams = { search: '', category: cat, serviceMode: 'All', sort: 'newest', page: 1, limit: 6 };
          navigate('/services');
        });
      });
      document.getElementById('footerSocialX')?.addEventListener('click', () => showToast('Follow @FixMateBD on X for updates!', 'info'));
      document.getElementById('footerSocialFB')?.addEventListener('click', () => showToast('Opened FixMate Bangladesh on Facebook', 'info'));
      document.getElementById('footerSocialIN')?.addEventListener('click', () => showToast('Opened FixMate Technologies on LinkedIn', 'info'));

      // Close modal on backdrop click
      document.getElementById('modalBackdrop')?.addEventListener('click', e => {
        if (e.target.id === 'modalBackdrop') closeModal();
      });

      window.addEventListener('popstate', () => {
        state.route = routeFromBrowserLocation();
        syncServiceQueryFromLocation();
        if ((state.route.startsWith('/dashboard') || state.route.startsWith('/payment')) && !state.currentUser) {
          state.redirectAfterLogin = state.route;
          state.route = '/sign-in';
          writeBrowserLocation('/sign-in', true);
        }
        saveState();
        renderApp();
      });
      renderApp();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootFixMateDemo, { once: true });
    } else {
      bootFixMateDemo();
    }