import './MobileDeviceMockup.css';
import { 
  Activity, 
  Trophy, 
  Play, 
  Flame, 
  TrendingUp, 
  CreditCard, 
  PieChart, 
  Plus, 
  Lock, 
  Mail, 
  User, 
  CheckCircle2, 
  Sparkles,
  Wifi,
  Battery
} from 'lucide-react';

export default function MobileDeviceMockup({ type = 'sports' }) {
  return (
    <div className={`phone-mockup phone-mockup-${type}`}>
      {/* Phone Hardware Shell */}
      <div className="phone-screen">
        {/* Status Bar */}
        <div className="phone-status-bar">
          <span className="phone-time">9:41</span>
          <div className="phone-notch">
            <div className="phone-camera"></div>
          </div>
          <div className="phone-indicators">
            <Wifi size={11} className="phone-icon" />
            <div className="phone-5g">5G</div>
            <Battery size={13} className="phone-icon" />
          </div>
        </div>

        {/* Dynamic Screen Content based on app type */}
        {type === 'sports' && (
          <div className="app-screen sports-screen">
            <div className="app-header">
              <div>
                <span className="app-subtitle">FC-GENIUS V1.0</span>
                <h4 className="app-title">Player Hub</h4>
              </div>
              <div className="app-avatar">
                <span>MR</span>
              </div>
            </div>

            {/* Performance Card */}
            <div className="sports-metric-card">
              <div className="sports-metric-header">
                <span className="sports-pill">
                  <Flame size={12} color="#CEFF00" /> Live Match
                </span>
                <span className="sports-time">82' MIN</span>
              </div>
              <div className="sports-score">
                <div className="team">
                  <div className="team-badge red"></div>
                  <span>FCG</span>
                </div>
                <div className="score-num">2 - 1</div>
                <div className="team">
                  <div className="team-badge blue"></div>
                  <span>ATH</span>
                </div>
              </div>
            </div>

            {/* Drills Section */}
            <div className="sports-section-title">
              <span>Interactive Drills</span>
              <span className="see-all">Active</span>
            </div>

            <div className="drill-item">
              <div className="drill-icon">
                <Activity size={14} color="#CEFF00" />
              </div>
              <div className="drill-info">
                <span className="drill-name">High-Intensity Agility</span>
                <span className="drill-sub">12 Drills • 240 kcal</span>
              </div>
              <div className="drill-action">
                <Play size={10} fill="#CEFF00" color="#CEFF00" />
              </div>
            </div>

            <div className="drill-item">
              <div className="drill-icon">
                <Trophy size={14} color="#CEFF00" />
              </div>
              <div className="drill-info">
                <span className="drill-name">Striker Precision Drill</span>
                <span className="drill-sub">REST API Sync • Live</span>
              </div>
              <div className="drill-action">
                <Play size={10} fill="#CEFF00" color="#CEFF00" />
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="phone-bottom-nav">
              <div className="nav-item active"><Activity size={14} /></div>
              <div className="nav-item"><Trophy size={14} /></div>
              <div className="nav-item"><Flame size={14} /></div>
              <div className="nav-item"><User size={14} /></div>
            </div>
          </div>
        )}

        {type === 'finance' && (
          <div className="app-screen finance-screen">
            <div className="app-header">
              <div>
                <span className="app-subtitle">EXPENSE TRACKER</span>
                <h4 className="app-title">Total Balance</h4>
              </div>
              <div className="app-icon-btn">
                <TrendingUp size={14} color="#38BDF8" />
              </div>
            </div>

            {/* Balance Card */}
            <div className="finance-balance-card">
              <span className="balance-label">Current Spend Month</span>
              <div className="balance-amount">$1,428.50</div>
              <div className="balance-tags">
                <span className="income-tag">+14.2% saved</span>
                <span className="budget-tag">Under budget</span>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="sports-section-title">
              <span>Recent Transactions</span>
              <span className="see-all">Filter</span>
            </div>

            <div className="tx-item">
              <div className="tx-icon">
                <CreditCard size={14} color="#38BDF8" />
              </div>
              <div className="tx-info">
                <span className="tx-name">Cloud Subscription</span>
                <span className="tx-sub">Development • Today</span>
              </div>
              <span className="tx-amount negative">-$29.00</span>
            </div>

            <div className="tx-item">
              <div className="tx-icon">
                <PieChart size={14} color="#38BDF8" />
              </div>
              <div className="tx-info">
                <span className="tx-name">Work Supplies</span>
                <span className="tx-sub">Hardware • Yesterday</span>
              </div>
              <span className="tx-amount negative">-$84.20</span>
            </div>

            {/* Floating Quick Action */}
            <div className="finance-fab">
              <Plus size={16} />
              <span>Add Expense</span>
            </div>

            {/* Bottom Nav */}
            <div className="phone-bottom-nav">
              <div className="nav-item active"><CreditCard size={14} /></div>
              <div className="nav-item"><PieChart size={14} /></div>
              <div className="nav-item"><TrendingUp size={14} /></div>
              <div className="nav-item"><User size={14} /></div>
            </div>
          </div>
        )}

        {type === 'auth' && (
          <div className="app-screen auth-screen">
            <div className="auth-header">
              <div className="auth-logo-badge">
                <Sparkles size={16} color="#A855F7" />
              </div>
              <h4 className="auth-title">Campus Portal</h4>
              <p className="auth-subtitle">Secure Academic Login</p>
            </div>

            <div className="auth-form-preview">
              <div className="input-field">
                <span className="input-label">Student / Faculty Email</span>
                <div className="input-box">
                  <Mail size={12} color="#A855F7" />
                  <span>student@campus.edu</span>
                </div>
              </div>

              <div className="input-field">
                <span className="input-label">Password</span>
                <div className="input-box">
                  <Lock size={12} color="#A855F7" />
                  <span>••••••••••••</span>
                </div>
              </div>

              <div className="auth-validation-indicator">
                <CheckCircle2 size={12} color="#10B981" />
                <span>Format validated by Dart regex</span>
              </div>

              <div className="auth-btn-preview">
                <span>Sign In to Dashboard</span>
              </div>
            </div>

            <div className="auth-footer-tag">
              <span>Flutter Form Validation Architecture</span>
            </div>
          </div>
        )}
      </div>

      {/* Glossy Reflection overlay */}
      <div className="phone-glare"></div>
    </div>
  );
}
