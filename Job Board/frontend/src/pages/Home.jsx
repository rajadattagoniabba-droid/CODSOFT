import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import heroIllustration from "../assets/hero_illustration.png";
import { FiBriefcase, FiMapPin, FiClock } from "react-icons/fi";

const DOMAINS = [
  { id: 'tech', title: 'Technology', count: '1.2k+ Jobs', icon: '💻' },
  { id: 'design', title: 'Design', count: '850+ Jobs', icon: '🎨' },
  { id: 'marketing', title: 'Marketing', count: '640+ Jobs', icon: '📈' },
  { id: 'sales', title: 'Sales', count: '420+ Jobs', icon: '🤝' },
  { id: 'finance', title: 'Finance', count: '380+ Jobs', icon: '💰' },
  { id: 'other', title: 'Other', count: '2k+ Jobs', icon: '✨' },
];

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  
  // New State
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'tech', 'design', etc.
  const [featuredJobs, setFeaturedJobs] = useState([]);

  const navigate = useNavigate();

  // Fetch suggestions when keyword changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword.length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const { data } = await axios.get(`http://localhost:5000/api/jobs/suggestions?q=${keyword}`);
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching suggestions");
      }
    };
    
    const timeoutId = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeoutId);
  }, [keyword]);

  // Fetch jobs when tab changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = activeTab === 'all' 
          ? `http://localhost:5000/api/jobs` 
          : `http://localhost:5000/api/jobs?category=${activeTab}`;
        const { data } = await axios.get(url);
        setFeaturedJobs(data.slice(0, 6)); // show top 6
      } catch (err) {
        console.error("Error fetching jobs");
      }
    };
    fetchJobs();
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${keyword}&location=${location}&category=${category}`);
  };

  const handleSuggestionClick = (title) => {
    setKeyword(title);
    setShowSuggestions(false);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: "80px", position: "relative" }}>
      {/* Hero Section */}
      <div className="hero-section" style={{ background: "var(--bg-dark)", padding: "4rem 0 8rem 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          
          {/* Left Text Area */}
          <div style={{ paddingRight: "2rem" }}>
            <p style={{ fontSize: "1.25rem", color: "var(--text-main)", fontWeight: "500", marginBottom: "1rem" }}>
              4536+ Jobs listed
            </p>
            <h1 style={{ fontSize: "4.5rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "1.5rem", lineHeight: "1.1" }}>
              Find your Dream Job
            </h1>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "2.5rem", lineHeight: "1.6" }}>
              We provide online instant cash loans with quick approval that suit your term length. 
              (Replace this dummy text with your actual subtitle)
            </p>
            <Link to="/register" className="btn btn-success" style={{ padding: "1rem 2rem", fontSize: "1.1rem", borderRadius: "0.25rem" }}>
              Upload Your Resume
            </Link>
          </div>

          {/* Right Image Area */}
          <div>
            <img src={heroIllustration} alt="Hero Illustration" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

        </div>
      </div>

      {/* Overlapping Search Bar */}
      <div className="container" style={{ marginTop: "-4rem", position: "relative", zIndex: 20 }}>
        <div className="glass" style={{ padding: "1.5rem", borderRadius: "0.5rem", background: "var(--bg-card)", boxShadow: "var(--shadow-lg)" }}>
          <form onSubmit={handleSearch} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "1rem", alignItems: "center" }}>
            
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search keyword" 
                className="input-field" 
                style={{ width: "100%", border: "none", borderRight: "1px solid var(--border-light)", borderRadius: 0, padding: "1rem" }}
                value={keyword}
                onChange={e => { setKeyword(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.map((job, idx) => (
                    <div 
                      key={idx} 
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(job.title)}
                    >
                      <strong>{job.title}</strong> <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>at {job.company}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input 
              type="text" 
              placeholder="Location" 
              className="input-field" 
              style={{ border: "none", borderRight: "1px solid var(--border-light)", borderRadius: 0, padding: "1rem" }}
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <select 
              className="input-field" 
              style={{ border: "none", borderRadius: 0, padding: "1rem", color: "var(--text-muted)", appearance: "none" }}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {DOMAINS.map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
            </select>
            <button type="submit" className="btn btn-success" style={{ padding: "1rem 2.5rem", fontSize: "1.1rem", borderRadius: "0.25rem", height: "100%" }}>
              Find Job
            </button>
          </form>
        </div>
      </div>

      {/* Popular Domains Section */}
      <div className="container" style={{ padding: "6rem 0 3rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>Browse by Domain</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Find jobs categorized by industry sectors</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {DOMAINS.map(domain => (
            <div 
              key={domain.id} 
              onClick={() => {
                setActiveTab(domain.id);
                document.getElementById('featured-jobs')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="glass card-hover" 
              style={{ padding: "2rem", textAlign: "center", borderRadius: "1rem" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{domain.icon}</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>{domain.title}</h3>
              <p style={{ color: "var(--primary-color)", fontSize: "0.9rem", fontWeight: "500" }}>{domain.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div id="featured-jobs" className="container" style={{ padding: "3rem 0 6rem 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>Featured Jobs</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>Discover the latest opportunities</p>
          </div>
          
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button className={`tab-btn ${activeTab === 'all' ? 'tab-active' : ''}`} onClick={() => setActiveTab('all')}>All Jobs</button>
            {DOMAINS.map(d => (
              <button key={d.id} className={`tab-btn ${activeTab === d.id ? 'tab-active' : ''}`} onClick={() => setActiveTab(d.id)}>{d.title}</button>
            ))}
          </div>
        </div>

        {featuredJobs.length > 0 ? (
          <div className="jobs-grid">
            {featuredJobs.map(job => (
              <div key={job._id} className="job-card card-hover" onClick={() => navigate(`/jobs/${job._id}`)}>
                <div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--text-main)", marginBottom: "0.25rem" }}>{job.title}</h3>
                  <p style={{ color: "var(--primary-color)", fontWeight: "500" }}>{job.company}</p>
                </div>
                
                <div style={{ display: "flex", gap: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><FiMapPin /> {job.location}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><FiClock /> {job.experienceLevel}</span>
                </div>
                
                <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "600" }}>{job.salary || "Not specified"}</span>
                  <button className="btn btn-secondary" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>Apply</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass" style={{ padding: "3rem", textAlign: "center", borderRadius: "1rem" }}>
            <p style={{ color: "var(--text-muted)" }}>No jobs found for this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
