-- Purpose: Seed initial products data for testing
-- Dependencies: 0000_lowly_union_jack.sql (products table creation)
-- Breaking Changes: None - this is seed data only

-- Insert sample products for testing
-- Using ON CONFLICT to make this migration idempotent
INSERT INTO products (name, sku, price, stock, image, low_stock_threshold, is_visible) VALUES
  ('Laptop Pro 15"', 'LPT-PRO-15', 1299.99, 50, 'https://example.com/images/laptop-pro-15.jpg', 5, true),
  ('Wireless Headphones', 'WHD-001', 89.99, 120, 'https://example.com/images/wireless-headphones.jpg', 20, true),
  ('Smartphone X', 'SMX-256', 799.99, 75, 'https://example.com/images/smartphone-x.jpg', 10, true),
  ('Gaming Mouse', 'GAM-MSE-RGB', 59.99, 200, 'https://example.com/images/gaming-mouse.jpg', 25, true),
  ('4K Monitor', '4K-MON-27', 349.99, 30, 'https://example.com/images/4k-monitor-27.jpg', 5, true),
  ('USB-C Hub', 'USB-HUB-7', 49.99, 150, 'https://example.com/images/usb-c-hub.jpg', 15, true),
  ('Bluetooth Speaker', 'BT-SPK-001', 79.99, 80, 'https://example.com/images/bluetooth-speaker.jpg', 10, true),
  ('Webcam HD', 'WBC-HD-001', 69.99, 60, 'https://example.com/images/webcam-hd.jpg', 8, true),
  ('Mechanical Keyboard', 'MKB-RGB-001', 129.99, 45, 'https://example.com/images/mechanical-keyboard.jpg', 10, true),
  ('External SSD 1TB', 'SSD-EXT-1TB', 119.99, 35, 'https://example.com/images/external-ssd-1tb.jpg', 5, true),
  ('Tablet 10"', 'TAB-10-WIFI', 299.99, 25, 'https://example.com/images/tablet-10.jpg', 3, true),
  ('Fitness Tracker', 'FIT-TRK-001', 149.99, 90, 'https://example.com/images/fitness-tracker.jpg', 15, true),
  ('Phone Case Pro', 'PCS-PRO-CLR', 24.99, 300, 'https://example.com/images/phone-case-pro.jpg', 50, true),
  ('Power Bank 20000mAh', 'PWR-20K-001', 39.99, 100, 'https://example.com/images/power-bank-20k.jpg', 20, true),
  ('Smart Watch', 'SMW-BLK-001', 199.99, 40, 'https://example.com/images/smart-watch.jpg', 8, true),
  ('Desk Lamp LED', 'DSK-LED-001', 34.99, 65, 'https://example.com/images/desk-lamp-led.jpg', 12, true),
  ('Wireless Charger', 'WCH-QI-001', 29.99, 180, 'https://example.com/images/wireless-charger.jpg', 30, true),
  ('Cable Organizer', 'CBL-ORG-001', 14.99, 250, 'https://example.com/images/cable-organizer.jpg', 40, true),
  ('Screen Cleaner Kit', 'SCR-CLN-KIT', 9.99, 400, 'https://example.com/images/screen-cleaner-kit.jpg', 60, true),
  ('Low Stock Item', 'LOW-STK-001', 19.99, 2, 'https://example.com/images/low-stock-item.jpg', 10, true)
ON CONFLICT (sku) DO NOTHING;