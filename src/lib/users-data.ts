export type UserStatus = "active" | "pending" | "suspended";
export type UserTier = "standard" | "premium" | "corporate";

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  status: UserStatus;
  aum: string;
  kyc: "verified" | "pending" | "expiring";
  joined: string;
};

export const usersMock: UserRecord[] = [
  {
    id: "USR-1042",
    name: "Fatima Al Mansoori",
    email: "fatima.m@email.ae",
    tier: "premium",
    status: "active",
    aum: "AED 284,500",
    kyc: "verified",
    joined: "Jan 12, 2026",
  },
  {
    id: "USR-1038",
    name: "James Okonkwo",
    email: "j.okonkwo@corp.io",
    tier: "corporate",
    status: "active",
    aum: "AED 1.2M",
    kyc: "verified",
    joined: "Dec 28, 2025",
  },
  {
    id: "USR-1031",
    name: "Sara Khoury",
    email: "sara.khoury@gmail.com",
    tier: "standard",
    status: "pending",
    aum: "AED 0",
    kyc: "pending",
    joined: "Feb 18, 2026",
  },
  {
    id: "USR-1024",
    name: "Omar Hassan",
    email: "omar.h@gold.ae",
    tier: "premium",
    status: "active",
    aum: "AED 412,800",
    kyc: "expiring",
    joined: "Nov 4, 2025",
  },
  {
    id: "USR-1019",
    name: "Priya Nair",
    email: "priya.nair@outlook.com",
    tier: "standard",
    status: "active",
    aum: "AED 18,240",
    kyc: "verified",
    joined: "Feb 2, 2026",
  },
  {
    id: "USR-1012",
    name: "Khalid Al Farsi",
    email: "k.alfarsi@enterprise.ae",
    tier: "corporate",
    status: "active",
    aum: "AED 3.8M",
    kyc: "verified",
    joined: "Aug 19, 2025",
  },
  {
    id: "USR-1008",
    name: "Elena Volkov",
    email: "elena.v@mail.ru",
    tier: "premium",
    status: "suspended",
    aum: "AED 96,100",
    kyc: "verified",
    joined: "Oct 30, 2025",
  },
  {
    id: "USR-1001",
    name: "David Chen",
    email: "david.chen@icloud.com",
    tier: "standard",
    status: "active",
    aum: "AED 42,600",
    kyc: "verified",
    joined: "Jan 25, 2026",
  },
];
