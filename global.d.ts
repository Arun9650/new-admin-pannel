// global.d.ts
import "next-auth";
import "next-auth/jwt";
// User Type
declare global {
  // types/next-auth.d.ts




  type User = {
    id: string;
    name?: string;
    chatId: string;
    taps: number;
    points: number;
    profit: number;
    lastProfitDate?: number;
    rechargeLimit: number;
    pointPerTap: number;
    profitPerHour: number;
    refillRate: number;
    bonus: number;
    active: boolean;
    skin: string;
    lastLogin: Date;
    skins: UserSkin[];
    league?: string;
    referralCount: number;
    accounts: Account[];
    sessions: Session[];
    authenticators: Authenticator[];
    loginStreak: number;
    createdAt: Date;
    updatedAt: Date;
    userCard: UserCard[];
    bonuster: Bonuster[];
    dailyRewards: DailyReward[];
    referredById?: string | null;
    referredBy?: User | null;
    referrals: User[];
    achievements: UserAchievement[];
    userTasks: TasksCompletion[];
    userYouTube: YouTubeCompletion[];
  };

  // AchievementCategory Type
  type AchievementCategory = {
    id: string;
    name: string;
    milestones: AchievementMilestone[];
  };

  // AchievementMilestone Type
  type AchievementMilestone = {
    id: string;
    categoryId: string;
    name: string;
    icon: string;
    unlocked: boolean;
    category: AchievementCategory;
    userAchievements: UserAchievement[];
  };

  // UserAchievement Type
  type UserAchievement = {
    id: string;
    userId: string;
    milestoneId: string;
    user: User;
    milestone: AchievementMilestone;
  };

  // DailyReward Type
  type DailyReward = {
    id: string;
    userId: string;
    day: number;
    coins: number;
    user: User;
    createdAt: Date;
  };

  // Card Type
  type Card = {
    id: string;
    title: string;
    image: string;
    baseCost: number;
    basePPH: number;
    baseLevel: number;
    category: string;
    description?: string;
    requiredCardId?: string | null;
    requiredCardLevel?: number | null;
    requiredCardTitle?: string | null;
    users: UserCard[];
  };

  // UserCard Type
  type UserCard = {
    id: string;
    title: string;
    image: string;
    baseCost: number;
    basePPH: number;
    baseLevel: number;
    userId: string;
    cardId: string;
    user: User;
    card: Card;
    category: string;
    description?: string;
  };

  // Account Type
  type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refreshToken?: string | null;
    accessToken?: string | null;
    expiresAt?: number | null;
    tokenType?: string | null;
    scope?: string | null;
    idToken?: string | null;
    sessionState?: string | null;
    user: User;
  };

  // Session Type
  type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
    createdAt: Date;
    updatedAt: Date;
  };

  // VerificationToken Type
  type VerificationToken = {
    identifier: string;
    token: string;
    expires: Date;
  };

  // Authenticator Type
  type Authenticator = {
    credentialID: string;
    userId: string;
    providerAccountId: string;
    credentialPublicKey: string;
    counter: number;
    credentialDeviceType: string;
    credentialBackedUp: boolean;
    transports?: string | null;
    user: User;
  };

  // Leagues Type
  type Leagues = {
    id: string;
    name: string;
    minEntry: number;
    pointLimit: number;
    trophy: string;
    entryReward: string;
  };

  // Points Type
  type Points = {
    id: string;
    user: string;
    points: number;
    league: string;
    autominer: boolean;
    tapLimit: number;
    lastTap: Date;
  };

  // Bonuster Type
  type Bonuster = {
    id: string;
    chatId: string;
    energy: number;
    energyCost: number;
    energylevel: number;
    multiClickLevel: number;
    multiClickCost: number;
    user: User;
  };

  // DailyBoosters Type
  type DailyBoosters = {
    id: string;
    name: string;
    count: number;
    icon: string;
  };

  // TaskCategories Type
  type TaskCategories = {
    id: string;
    name: string;
  };

  // Tasks Type
  type Tasks = {
    id: string;
    category: string;
    name: string;
    points: number;
    link: string;
    icon: string;
    user: TasksCompletion[];
  };

  // TasksCompletion Type
  type TasksCompletion = {
    id: string;
    taskId: string;
    userId: string;
    user: User;
    task: Tasks;
    points: number;
  };

  // YouTube Type
  type YouTube = {
    id: string;
    category: string;
    name: string;
    points: number;
    link: string;
    icon: string;
    user: YouTubeCompletion[];
  };

  // YouTubeCompletion Type
  type YouTubeCompletion = {
    id: string;
    taskId: string;
    userId: string;
    user: User;
    task: YouTube;
    points: number;
  };

  // Skins Type
  type Skins = {
    id: string;
    name: string;
    image: string;
    cost: number;
    featured: boolean;
    league: string;
    users: UserSkin[];
  };

  // UserSkin Type
  type UserSkin = {
    id: string;
    userId: string;
    skinId: string;
    user: User;
    skin: Skins;
  };
}

export {};
