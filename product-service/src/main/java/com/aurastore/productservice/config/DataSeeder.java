package com.aurastore.productservice.config;

import com.aurastore.productservice.entity.ProductEntity;
import com.aurastore.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            productRepository.saveAll(List.of(
                // Electronics
                ProductEntity.builder()
                        .id("prod-1")
                        .name("Aura SoundPro Wireless Headphones")
                        .price(4999.0)
                        .originalPrice(7999.0)
                        .category("Electronics")
                        .rating(4.8)
                        .reviewsCount(142)
                        .tag("Best Seller")
                        .image("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80")
                        .description("Active Noise Cancelling over-ear headphones with 40-hour battery life, high-res audio drivers.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-2")
                        .name("Lumix Neo Minimalist Smartwatch")
                        .price(3499.0)
                        .originalPrice(5999.0)
                        .category("Electronics")
                        .rating(4.6)
                        .reviewsCount(89)
                        .tag("Trending")
                        .image("https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80")
                        .description("Sleek AMOLED smartwatch with continuous heart rate monitoring, SPO2 sensor, GPS tracking.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-4")
                        .name("AeroPulse Mechanical Keyboard")
                        .price(4299.0)
                        .originalPrice(6299.0)
                        .category("Electronics")
                        .rating(4.7)
                        .reviewsCount(95)
                        .tag("Hot Item")
                        .image("https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80")
                        .description("Compact 75% hot-swappable mechanical gaming keyboard with RGB backlighting.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-7")
                        .name("SonicBeat True Wireless Earphones")
                        .price(1999.0)
                        .originalPrice(3499.0)
                        .category("Electronics")
                        .rating(4.7)
                        .reviewsCount(165)
                        .tag("Trending")
                        .image("https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80")
                        .description("TWS Earbuds with 13mm dynamic drivers, low latency gaming mode, touch controls.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-8")
                        .name("Titan X Pro Smartphone 5G 256GB")
                        .price(24999.0)
                        .originalPrice(32999.0)
                        .category("Electronics")
                        .rating(4.9)
                        .reviewsCount(310)
                        .tag("Top Flagship")
                        .image("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80")
                        .description("Flagship 5G Smartphone with 120Hz FHD+ AMOLED Display, 108MP OIS Triple Camera.")
                        .build(),

                // Fashion
                ProductEntity.builder()
                        .id("prod-5")
                        .name("Velvet Noir Oversized Hoodie")
                        .price(1899.0)
                        .originalPrice(2999.0)
                        .category("Fashion")
                        .rating(4.5)
                        .reviewsCount(64)
                        .tag("Sale")
                        .image("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80")
                        .description("Heavyweight 400 GSM French terry cotton hoodie with fleece lining.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-11")
                        .name("Essential Cotton Crew Neck T-Shirt")
                        .price(799.0)
                        .originalPrice(1299.0)
                        .category("Fashion")
                        .rating(4.4)
                        .reviewsCount(240)
                        .tag("Super Saver")
                        .image("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80")
                        .description("Premium combed bio-washed cotton T-Shirt offering breathable all-day softness.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-13")
                        .name("AirStride Lightweight Urban Sneakers")
                        .price(2499.0)
                        .originalPrice(3999.0)
                        .category("Fashion")
                        .rating(4.7)
                        .reviewsCount(175)
                        .tag("Best Seller")
                        .image("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80")
                        .description("Ergonomic breathable mesh sneakers with high-rebound EVA cushioning sole.")
                        .build(),

                // Home
                ProductEntity.builder()
                        .id("prod-6")
                        .name("Zenith Studio Desk Lamp")
                        .price(1499.0)
                        .originalPrice(2499.0)
                        .category("Home")
                        .rating(4.8)
                        .reviewsCount(118)
                        .tag("Popular")
                        .image("https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80")
                        .description("Architectural aluminum LED desk lamp with touch dimming and integrated wireless charger.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-15")
                        .name("Ergonomic Mesh Executive Office Chair")
                        .price(8999.0)
                        .originalPrice(12999.0)
                        .category("Home")
                        .rating(4.9)
                        .reviewsCount(205)
                        .tag("Top Rated")
                        .image("https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80")
                        .description("High-back ergonomic mesh chair with adjustable lumbar support, 3D armrests.")
                        .build(),

                // Accessories
                ProductEntity.builder()
                        .id("prod-3")
                        .name("Urban Luxe Leather Laptop Backpack")
                        .price(2999.0)
                        .originalPrice(4499.0)
                        .category("Accessories")
                        .rating(4.9)
                        .reviewsCount(210)
                        .tag("New")
                        .image("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80")
                        .description("Handcrafted full-grain leather backpack featuring a padded 15.6\" laptop sleeve.")
                        .build(),
                ProductEntity.builder()
                        .id("prod-18")
                        .name("Heritage Full Grain Leather Bifold Wallet")
                        .price(999.0)
                        .originalPrice(1699.0)
                        .category("Accessories")
                        .rating(4.8)
                        .reviewsCount(190)
                        .tag("Must Have")
                        .image("https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80")
                        .description("Hand-stitched full grain leather wallet with RFID blocking layer.")
                        .build()
            ));
        }
    }
}
