"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import styles from "./WeatherCard.module.scss";
import Image from "next/image";
import MobileMenu from "../Layout/MobileMenu/MobileMenu";

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  highTemp: number;
  lowTemp: number;
  hourlyForecast: Array<{
    time: string;
    temperature: number;
    icon: string;
    precipChance: number;
  }>;
  weeklyForecast?: Array<{
    day: string;
    icon: string;
    highTemp: number;
    lowTemp: number;
    precipChance: number;
  }>;
  onAddLocation?: () => void;
}

// List of available weather icons in public directory
const availableIcons = [
  "Moon_cloud_fast_wind",
  "Moon_cloud_mid_rain",
  "Sun_cloud_angled_rain",
  "Sun_cloud_mid_rain",
  "Tornado",
];

// Helper function to check if a string is likely an emoji
const isEmoji = (str: string): boolean => {
  return /\p{Emoji}/u.test(str);
};

export default function WeatherCard({
  city = "Montreal",
  temperature = 19,
  description = "Mostly Clear",
  highTemp = 24,
  lowTemp = 18,
  hourlyForecast = [
    { time: "12 AM", temperature: 19, icon: "🌧️", precipChance: 30 },
    { time: "Now", temperature: 19, icon: "🌥️", precipChance: 0 },
    { time: "2 AM", temperature: 18, icon: "🌧️", precipChance: 0 },
    { time: "3 AM", temperature: 19, icon: "🌧️", precipChance: 0 },
    { time: "4 AM", temperature: 19, icon: "🌧️", precipChance: 0 },
  ],
  weeklyForecast = [
    {
      day: "Today",
      icon: "Moon_cloud_fast_wind",
      highTemp: 24,
      lowTemp: 18,
      precipChance: 0,
    },
    {
      day: "Mon",
      icon: "Sun_cloud_angled_rain",
      highTemp: 22,
      lowTemp: 17,
      precipChance: 40,
    },
    {
      day: "Tue",
      icon: "Sun_cloud_angled_rain",
      highTemp: 21,
      lowTemp: 16,
      precipChance: 80,
    },
    {
      day: "Wed",
      icon: "Sun_cloud_mid_rain",
      highTemp: 23,
      lowTemp: 18,
      precipChance: 10,
    },
    { day: "Thu", icon: "Tornado", highTemp: 26, lowTemp: 19, precipChance: 0 },
    { day: "Fri", icon: "Tornado", highTemp: 27, lowTemp: 20, precipChance: 0 },
    {
      day: "Sat",
      icon: "Moon_cloud_fast_wind",
      highTemp: 25,
      lowTemp: 19,
      precipChance: 20,
    },
  ],
  onAddLocation,
}: WeatherCardProps) {
  const [activeTab, setActiveTab] = useState("hourly");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaceholders, setShowPlaceholders] = useState(false);
  const [currentHourFormatted, setCurrentHourFormatted] = useState<string>("");

  // Function to get the current hour in "h AM/PM" format
  const getCurrentHourFormatted = (): string => {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours} ${ampm}`;
  };

  // Update current hour on component mount and when the component is visible
  useEffect(() => {
    setCurrentHourFormatted(getCurrentHourFormatted());

    // Update the current hour every minute
    const intervalId = setInterval(() => {
      setCurrentHourFormatted(getCurrentHourFormatted());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // New function to handle closing the expanded card
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsExpanded(false);
  };

  // Disable body scrolling when card is expanded
  useEffect(() => {
    const handleBodyScroll = () => {
      if (isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleBodyScroll();

    // Show placeholders with a slight delay after expansion
    let timer: NodeJS.Timeout;
    if (isExpanded) {
      timer = setTimeout(() => {
        setShowPlaceholders(true);
      }, 300);
    } else {
      setShowPlaceholders(false);
    }

    return () => {
      document.body.style.overflow = "";
      if (timer) clearTimeout(timer);
    };
  }, [isExpanded]);

  // Handle touch/mouse events for swipe
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    // Only initiate dragging if:
    // 1. Card is not expanded OR
    // 2. Card is expanded and touch started on the drag handle
    if (
      !isExpanded ||
      (isExpanded && (e.target as Element).closest(`.${styles.dragHandle}`))
    ) {
      setIsDragging(true);
      if ("touches" in e) {
        setStartY(e.touches[0].clientY);
      } else {
        setStartY(e.clientY);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    let currentY;
    if ("touches" in e) {
      currentY = e.touches[0].clientY;
      // Don't call preventDefault() here as it causes the error with passive listeners
    } else {
      currentY = e.clientY;
    }

    const diff = currentY - startY;

    // Allow dragging in appropriate directions based on expanded state
    if ((isExpanded && diff > 0) || (!isExpanded && diff < 0)) {
      setOffsetY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Threshold for expanding (15% of viewport height)
    const expandThreshold = window.innerHeight * 0.15;
    // Smaller threshold for collapsing (8% of viewport height)
    const collapseThreshold = window.innerHeight * 0.08;

    // Only expand if dragged up enough when not expanded
    if (!isExpanded && offsetY < -expandThreshold) {
      setIsExpanded(true);
    }
    // Only collapse if dragged down enough when expanded
    else if (isExpanded && offsetY > collapseThreshold) {
      setIsExpanded(false);
    }

    // Always reset the offset
    setOffsetY(0);
  };

  // Render icon based on type - handle emojis, icon names, and paths
  const renderWeatherIcon = (icon: string, size: number) => {
    // If it's an emoji, just display it
    if (isEmoji(icon)) {
      return <span style={{ fontSize: `${size / 16}rem` }}>{icon}</span>;
    }

    // If it's one of our known icon names, use the image from public directory
    if (availableIcons.includes(icon)) {
      return (
        <Image
          src={`/icons/${icon}.png`}
          alt="Weather icon"
          width={size}
          height={size}
        />
      );
    }

    // If it's a valid path, use it directly
    if (icon.startsWith("/") || icon.startsWith("http")) {
      return <Image src={icon} alt="Weather icon" width={size} height={size} />;
    }

    // Fallback to showing the icon string itself
    return <span style={{ fontSize: `${size / 16}rem` }}>🌤️</span>;
  };

  // Reorder hourly forecast to start from current hour
  const reorderedHourlyForecast = useMemo(() => {
    // Find the index of the current hour
    const currentHourIndex = hourlyForecast.findIndex(
      (hour) => hour.time === currentHourFormatted
    );
    
    // If current hour is not found in the forecast, return the original array
    if (currentHourIndex === -1) return hourlyForecast;
    
    // Reorder the array to start from current hour and wrap around
    const reordered = [
      ...hourlyForecast.slice(currentHourIndex - 1),
      ...hourlyForecast.slice(0, currentHourIndex - 1)
    ];
    
    return reordered;
  }, [hourlyForecast, currentHourFormatted]);

  return (
    <div
      className={`${styles.weatherCard} ${isExpanded ? styles.expanded : ""}`}
      ref={cardRef}
      style={{
        ...(isDragging ? { transform: `translateY(${offsetY}px)` } : {}),
        ...(isExpanded ? {} : { paddingBottom: '110px' })
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => isDragging && handleTouchEnd()}
    >
      {/* Add close button - only visible when expanded */}
      {isExpanded && (
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close expanded view"
        >
          ×
        </button>
      )}

      {/* Header section with city and temperature */}
      {isExpanded && (
        <div className={styles.headerSection}>
          <h2 className={styles.cityName}>{city}</h2>
          <div className={styles.currentConditions}>
            <span className={styles.temperature}>{temperature}°</span>
            <span className={styles.separator}>|</span>
            <span className={styles.weatherDescription}>{description}</span>
          </div>
        </div>
      )}

      <div className={styles.dragHandle}>
        <div className={styles.dragIndicator}></div>
      </div>

      <div className={styles.tabContainer}>
        <div
          className={`${styles.tabs} ${
            activeTab === "weekly" ? styles.weeklyActive : ""
          }`}
        >
          <div
            className={`${styles.tab} ${
              activeTab === "hourly" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("hourly")}
          >
            Hourly Forecast
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "weekly" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly Forecast
          </div>
        </div>

        <div className={styles.sliderWrapper}>
          <div
            className={`${styles.forecastContent} ${styles.hourlyForecast} ${
              activeTab === "hourly" ? styles.active : styles.inactive
            }`}
          >
            {reorderedHourlyForecast.map((hour, index) => (
              <div
                key={`hour-${index}`}
                className={`${styles.hourItem} ${
                  hour.time === currentHourFormatted ? styles.current : ""
                }`}
              >
                <div className={styles.time}>
                  {hour.time === currentHourFormatted ? "Now" : hour.time}
                </div>
                <div className={styles.iconContainer}>
                  <div className={styles.icon}>
                    {renderWeatherIcon(hour.icon, 32)}
                  </div>
                  {hour.precipChance > 0 && (
                    <div className={styles.precipChance}>
                      {hour.precipChance}%
                    </div>
                  )}
                </div>
                <div className={styles.hourTemp}>{hour.temperature}°</div>
              </div>
            ))}
          </div>

          <div
            className={`${styles.forecastContent} ${styles.weeklyForecast} ${
              activeTab === "weekly" ? styles.active : styles.inactive
            }`}
          >
            {weeklyForecast.map((day, index) => (
              <div key={index} className={styles.dayItem}>
                <div className={styles.dayInfo}>
                  <div className={styles.day}>{day.day}</div>
                  <div className={styles.icon}>
                    {renderWeatherIcon(day.icon, 24)}
                  </div>
                  {day.precipChance > 0 && (
                    <div className={styles.precipChance}>
                      {day.precipChance}%
                    </div>
                  )}
                </div>
                <div className={styles.tempRange}>
                  <div className={styles.highTemp}>{day.highTemp}°</div>
                  <div className={styles.lowTemp}>{day.lowTemp}°</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional content shown only when expanded on mobile */}
      {showPlaceholders && (
        <div className={styles.expandedContent}>
          <section className={styles.expandedSection}>
            <div className={styles.airQualityPlaceholder}>
              <h3>AIR QUALITY</h3>
              <div className={styles.airQualityValue}>3-Low Health Risk</div>
              <div className={styles.airQualityScale}>
                <div className={styles.airQualityBar}></div>
              </div>
              <div className={styles.seeMore}>
                <span>See more</span>
                <span className={styles.chevron}>›</span>
              </div>
            </div>
          </section>

          <div className={styles.insightsGrid}>
            <div className={styles.insightItem}>
              <div className={styles.insightLabel}>UV INDEX</div>
              <div className={styles.insightValue}>4</div>
              <div className={styles.insightSubtext}>Moderate</div>
              <div className={styles.insightScale}>
                <div className={styles.insightBar}></div>
              </div>
            </div>

            <div className={styles.insightItem}>
              <div className={styles.insightLabel}>SUNRISE</div>
              <div className={styles.insightValue}>5:28 AM</div>
              <div className={styles.sunGraph}>
                <div className={styles.sunPath}></div>
                <div className={styles.sunDot}></div>
              </div>
              <div className={styles.insightSubtext}>Sunset: 7:25PM</div>
            </div>

            <div className={styles.insightItem}>
              <div className={styles.insightLabel}>WIND</div>
              <div className={styles.windDisplay}>
                <div className={styles.windCompass}>
                  <div className={styles.compassNeedle}></div>
                  <div className={styles.compassN}>N</div>
                </div>
                <div className={styles.windSpeed}>
                  <div className={styles.insightValue}>9.7</div>
                  <div className={styles.insightSubtext}>km/h</div>
                </div>
              </div>
            </div>

            <div className={styles.insightItem}>
              <div className={styles.insightLabel}>RAINFALL</div>
              <div className={styles.insightValue}>1.8 mm</div>
              <div className={styles.insightSubtext}>in last hour</div>
            </div>
          </div>
        </div>
      )}

      {/* Replace the bottomNav with MobileMenu component */}
      <MobileMenu isExpanded={isExpanded} onAddLocation={onAddLocation} />
    </div>
  );
}
