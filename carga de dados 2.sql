-- --------------------------------------------------------------------
-- Ingredientes Globais Comuns (is_global = 1)
-- --------------------------------------------------------------------
INSERT INTO ingredients (id, name, is_global, restaurant_id, created_at, updated_at) VALUES
('ing-global-001', 'Sal', 1, NULL, NOW(), NOW()),
('ing-global-002', 'Pimenta do Reino Preta Moída', 1, NULL, NOW(), NOW()),
('ing-global-003', 'Azeite Extra Virgem', 1, NULL, NOW(), NOW()),
('ing-global-004', 'Cebola Branca', 1, NULL, NOW(), NOW()),
('ing-global-005', 'Alho Picado', 1, NULL, NOW(), NOW()),
('ing-global-006', 'Tomate Italiano Maduro', 1, NULL, NOW(), NOW()),
('ing-global-007', 'Arroz Branco Agulhinha', 1, NULL, NOW(), NOW()),
('ing-global-008', 'Feijão Carioca', 1, NULL, NOW(), NOW()),
('ing-global-009', 'Batata Inglesa', 1, NULL, NOW(), NOW()),
('ing-global-010', 'Alface Americana', 1, NULL, NOW(), NOW()),
('ing-global-011', 'Queijo Mussarela Ralado', 1, NULL, NOW(), NOW()),
('ing-global-012', 'Peito de Frango', 1, NULL, NOW(), NOW()),
('ing-global-013', 'Contrafilé Bovino', 1, NULL, NOW(), NOW()),
('ing-global-014', 'Óleo de Soja', 1, NULL, NOW(), NOW()),
('ing-global-015', 'Açúcar Refinado', 1, NULL, NOW(), NOW()),
('ing-global-016', 'Farinha de Trigo Tipo 1', 1, NULL, NOW(), NOW()),
('ing-global-017', 'Ovo de Galinha', 1, NULL, NOW(), NOW()),
('ing-global-018', 'Leite Integral', 1, NULL, NOW(), NOW()),
('ing-global-019', 'Manteiga Sem Sal', 1, NULL, NOW(), NOW()),
('ing-global-020', 'Manjericão Fresco', 1, NULL, NOW(), NOW());

-- ==================================================================
-- Restaurante 1: Sabor da Fazenda (Cozinha Brasileira Regional)
-- ==================================================================
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, cover_url, created_at, updated_at) VALUES
('res-001', 'Sabor da Fazenda', 'Autêntica cozinha brasileira com ingredientes frescos da roça. Pratos fartos e saborosos que remetem à tradição mineira e goiana.', 'Rua dos Ipês, 123 - Bairro da Mata, Belo Horizonte - MG', '(31) 99999-0001', '12345678000199', '123456789', 'https://placehold.co/600x400/8FBC8F/white?text=Sabor+da+Fazenda', 'https://placehold.co/1920x400/8FBC8F/white?text=Sabor+da+Fazenda', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-bra-001', 'Entradas Brasileiras', 'res-001', NOW(), NOW()),
('cat-bra-002', 'Pratos Principais', 'res-001', NOW(), NOW()),
('cat-bra-003', 'Acompanhamentos', 'res-001', NOW(), NOW()),
('cat-bra-004', 'Sobremesas Caseiras', 'res-001', NOW(), NOW());

INSERT INTO ingredients (id, name, is_global, restaurant_id, created_at, updated_at) VALUES
('ing-bra-001', 'Queijo Canastra', 0, 'res-001', NOW(), NOW()),
('ing-bra-002', 'Linguiça Caseira', 0, 'res-001', NOW(), NOW()),
('ing-bra-003', 'Mandioca Cozida', 0, 'res-001', NOW(), NOW()),
('ing-bra-004', 'Couve Refogada', 0, 'res-001', NOW(), NOW()),
('ing-bra-005', 'Frango Caipira', 0, 'res-001', NOW(), NOW()),
('ing-bra-006', 'Tutu de Feijão', 0, 'res-001', NOW(), NOW()),
('ing-bra-007', 'Doce de Leite Mineiro', 0, 'res-001', NOW(), NOW()),
('ing-bra-008', 'Goiabada Cascão', 0, 'res-001', NOW(), NOW()),
('ing-bra-009', 'Bacon Caseiro', 0, 'res-001', NOW(), NOW()),
('ing-bra-010', 'Quiabo Fresco', 0, 'res-001', NOW(), NOW()),
('ing-bra-011', 'Costela Bovina', 0, 'res-001', NOW(), NOW()),
('ing-bra-012', 'Fubá Mimoso', 0, 'res-001', NOW(), NOW()),
('ing-bra-013', 'Queijo Minas Frescal', 0, 'res-001', NOW(), NOW());

INSERT INTO ingredients (id, name, is_global, restaurant_id, created_at, updated_at) values
('ing-bra-014', 'Farinha de Mandioca Grossa', 0, 'res-001', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-bra-001', 'Pão de Queijo Mineiro (6 unidades)', 'Pãezinhos de queijo fresquinhos, receita tradicional mineira com queijo Canastra.', 22.00, 'https://placehold.co/300x200/8FBC8F/white?text=Pao+de+Queijo', 'cat-bra-001', 'res-001', NOW(), NOW()),
('item-bra-002', 'Torresmo à Mineira', 'Barriga de porco crocante e saborosa, cortada em cubos, um clássico da culinária mineira.', 35.00, 'https://placehold.co/300x200/8FBC8F/white?text=Torresmo', 'cat-bra-001', 'res-001', NOW(), NOW()),
('item-bra-003', 'Feijão Tropeiro Completo', 'Feijão cozido com linguiça caseira, bacon caseiro, ovos, couve refogada e farinha de mandioca.', 48.00, 'https://placehold.co/300x200/8FBC8F/white?text=Feijao+Tropeiro', 'cat-bra-002', 'res-001', NOW(), NOW()),
('item-bra-004', 'Frango com Quiabo', 'Frango caipira cozido lentamente com quiabo fresco, um prato reconfortante e cheio de sabor.', 52.00, 'https://placehold.co/300x200/8FBC8F/white?text=Frango+Quiabo', 'cat-bra-002', 'res-001', NOW(), NOW()),
('item-bra-005', 'Vaca Atolada', 'Costela bovina cozida na mandioca até desfiar, um prato rústico e delicioso.', 55.00, 'https://placehold.co/300x200/8FBC8F/white?text=Vaca+Atolada', 'cat-bra-002', 'res-001', NOW(), NOW()),
('item-bra-006', 'Arroz com Pequi', 'Arroz branco cozido com pequi, fruto típico do cerrado com aroma e sabor únicos.', 30.00, 'https://placehold.co/300x200/8FBC8F/white?text=Arroz+Pequi', 'cat-bra-003', 'res-001', NOW(), NOW()),
('item-bra-007', 'Tutu de Feijão à Mineira', 'Purê cremoso de feijão com linguiça, bacon e temperos, um acompanhamento rico e saboroso.', 28.00, 'https://placehold.co/300x200/8FBC8F/white?text=Tutu+de+Feijao', 'cat-bra-003', 'res-001', NOW(), NOW()),
('item-bra-008', 'Couve Refogada com Alho', 'Couve finamente cortada e refogada com alho e azeite, um acompanhamento saudável e saboroso.', 20.00, 'https://placehold.co/300x200/8FBC8F/white?text=Couve+Refogada', 'cat-bra-003', 'res-001', NOW(), NOW()),
('item-bra-009', 'Doce de Leite com Queijo', 'Clássica sobremesa mineira com doce de leite caseiro e queijo Canastra.', 25.00, 'https://placehold.co/300x200/8FBC8F/white?text=Doce+Queijo', 'cat-bra-004', 'res-001', NOW(), NOW()),
('item-bra-010', 'Bolo de Fubá Cremoso', 'Bolo de fubá cremoso, receita tradicional da fazenda com textura macia e saborosa.', 22.00, 'https://placehold.co/300x200/8FBC8F/white?text=Bolo+de+Fuba', 'cat-bra-004', 'res-001', NOW(), NOW()),
('item-bra-011', 'Goiabada com Queijo (Romeu e Julieta)', 'Fatias de goiabada cascão servidas com queijo minas frescal.', 20.00, 'https://placehold.co/300x200/8FBC8F/white?text=Romeu+Julieta', 'cat-bra-004', 'res-001', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
(UUID(), 'item-bra-001', (SELECT id FROM ingredients WHERE name = 'Farinha de Trigo Tipo 1' AND is_global = 1)),
(UUID(), 'item-bra-001', (SELECT id FROM ingredients WHERE name = 'Ovo de Galinha' AND is_global = 1)),
(UUID(), 'item-bra-001', (SELECT id FROM ingredients WHERE name = 'Leite Integral' AND is_global = 1)),
(UUID(), 'item-bra-001', (SELECT id FROM ingredients WHERE name = 'Óleo de Soja' AND is_global = 1)),
(UUID(), 'item-bra-001', (SELECT id FROM ingredients WHERE name = 'Queijo Canastra' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-003', (SELECT id FROM ingredients WHERE name = 'Feijão Carioca' AND is_global = 1)),
(UUID(), 'item-bra-003', (SELECT id FROM ingredients WHERE name = 'Linguiça Caseira' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-003', (SELECT id FROM ingredients WHERE name = 'Bacon Caseiro' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-003', (SELECT id FROM ingredients WHERE name = 'Ovo de Galinha' AND is_global = 1)),
(UUID(), 'item-bra-003', (SELECT id FROM ingredients WHERE name = 'Couve Refogada' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-003', (SELECT id FROM ingredients WHERE name = 'Farinha de Mandioca Grossa' AND is_global = 0)),
(UUID(), 'item-bra-004', (SELECT id FROM ingredients WHERE name = 'Frango Caipira' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-004', (SELECT id FROM ingredients WHERE name = 'Quiabo Fresco' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-004', (SELECT id FROM ingredients WHERE name = 'Cebola Branca' AND is_global = 1)),
(UUID(), 'item-bra-004', (SELECT id FROM ingredients WHERE name = 'Alho Picado' AND is_global = 1)),
(UUID(), 'item-bra-005', (SELECT id FROM ingredients WHERE name = 'Costela Bovina' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-005', (SELECT id FROM ingredients WHERE name = 'Mandioca Cozida' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-005', (SELECT id FROM ingredients WHERE name = 'Cebola Branca' AND is_global = 1)),
(UUID(), 'item-bra-005', (SELECT id FROM ingredients WHERE name = 'Alho Picado' AND is_global = 1)),
(UUID(), 'item-bra-009', (SELECT id FROM ingredients WHERE name = 'Doce de Leite Mineiro' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-009', (SELECT id FROM ingredients WHERE name = 'Queijo Canastra' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-010', (SELECT id FROM ingredients WHERE name = 'Fubá Mimoso' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-010', (SELECT id FROM ingredients WHERE name = 'Leite Integral' AND is_global = 1)),
(UUID(), 'item-bra-010', (SELECT id FROM ingredients WHERE name = 'Ovo de Galinha' AND is_global = 1)),
(UUID(), 'item-bra-010', (SELECT id FROM ingredients WHERE name = 'Açúcar Refinado' AND is_global = 1)),
(UUID(), 'item-bra-011', (SELECT id FROM ingredients WHERE name = 'Goiabada Cascão' AND restaurant_id = 'res-001')),
(UUID(), 'item-bra-011', (SELECT id FROM ingredients WHERE name = 'Queijo Minas Frescal' AND restaurant_id = 'res-001'));

-- Restaurante 2
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0002', 'Gastronomia Suprema', 'Sabores do mundo em um só lugar.', 'Av. Central, 456', '(21) 91234-5678', '98765432000100', '987654321', 'https://example.com/images/gastronomia_suprema.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0002-01', 'Entradas', '1a2b3c4d-0002', NOW(), NOW()),
('cat-0002-02', 'Massas', '1a2b3c4d-0002', NOW(), NOW()),
('cat-0002-03', 'Carnes', '1a2b3c4d-0002', NOW(), NOW()),
('cat-0002-04', 'Bebidas', '1a2b3c4d-0002', NOW(), NOW()),
('cat-0002-05', 'Sobremesas', '1a2b3c4d-0002', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0002-01', 'Bolinho de Bacalhau', 'Tradicional bolinho português.', 15.00, 'https://casaeconstrucao.vivadecora.com.br/wp-content/uploads/2022/01/Dicas-de-como-fazer-bolinho-de-bacalhau-Foto-iStock.jpg', 'cat-0002-01', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-02', 'Lasanha Bolonhesa', 'Lasanha recheada com molho de carne e queijo.', 32.00, NULL, 'cat-0002-02', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-03', 'Picanha Grelhada', 'Picanha suculenta com farofa e vinagrete.', 52.00, NULL, 'cat-0002-03', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-04', 'Refrigerante Lata', 'Coca-Cola, Guaraná ou Fanta.', 6.00, NULL, 'cat-0002-04', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-05', 'Pudim de Leite', 'Pudim cremoso com calda de caramelo.', 14.00, NULL, 'cat-0002-05', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-06', 'Patê de Atum', 'Atum temperado com torradas.', 15.00, NULL, 'cat-0002-01', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-07', 'Espaguete Carbonara', 'Massa com molho de ovo, queijo e bacon.', 32.00, NULL, 'cat-0002-02', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-08', 'Picanha Grelhada', 'Picanha suculenta com farofa.', 57.00, NULL, 'cat-0002-03', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-09', 'Refrigerante', 'Coca-Cola ou Guaraná.', 6.00, NULL, 'cat-0002-04', '1a2b3c4d-0002', NOW(), NOW()),
('item-0002-10', 'Pudim de Leite', 'Clássico pudim de leite condensado.', 14.00, NULL, 'cat-0002-05', '1a2b3c4d-0002', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0002-01', 'Bacalhau', NOW(), NOW()),
('ing-0002-02', 'Batata', NOW(), NOW()),
('ing-0002-03', 'Cebola', NOW(), NOW()),
('ing-0002-04', 'Ovo', NOW(), NOW()),
('ing-0002-05', 'Farinha de trigo', NOW(), NOW()),
('ing-0002-06', 'Carne moída',  NOW(), NOW()),
('ing-0002-07', 'Massa de lasanha', NOW(), NOW()),
('ing-0002-08', 'Queijo',  NOW(), NOW()),
('ing-0002-09', 'Picanha', NOW(), NOW()),
('ing-0002-10', 'Farinha', NOW(), NOW()),
('ing-0002-11', 'Arroz',  NOW(), NOW()),
('ing-0002-12', 'Coca-Cola', NOW(), NOW()),
('ing-0002-13', 'Guaraná',  NOW(), NOW()),
('ing-0002-14', 'Leite condensado', NOW(), NOW()),
('ing-0002-15', 'Leite', NOW(), NOW()),
('ing-0002-16', 'Atum',  NOW(), NOW()),
('ing-0002-17', 'Torrada',  NOW(), NOW()),
('ing-0002-18', 'Espaguete', NOW(), NOW()),
('ing-0002-19', 'Bacon', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Bolinho de Bacalhau (item-0002-01)
('ing-menu-0002-01', 'item-0002-01', 'ing-0002-01'),
('ing-menu-0002-02', 'item-0002-01', 'ing-0002-02'),
('ing-menu-0002-03', 'item-0002-01', 'ing-0002-03'),
('ing-menu-0002-04', 'item-0002-01', 'ing-0002-04'),
('ing-menu-0002-05', 'item-0002-01', 'ing-0002-05'),

-- Ingredientes para Lasanha Bolonhesa (item-0002-02)
('ing-menu-0002-06', 'item-0002-02', 'ing-0002-06'),
('ing-menu-0002-07', 'item-0002-02', 'ing-0002-07'),
('ing-menu-0002-08', 'item-0002-02', 'ing-0002-08'),

-- Ingredientes para Picanha Grelhada (item-0002-03)
('ing-menu-0002-09', 'item-0002-03', 'ing-0002-09'),
('ing-menu-0002-10', 'item-0002-03', 'ing-0002-10'),
('ing-menu-0002-1dfs1', 'item-0002-03', 'ing-0002-11'),

-- Ingredientes para Refrigerante Lata (item-0002-04)
('ing-menu-0002-1332', 'item-0002-04', 'ing-0002-12'),
('ing-menu-0002-133', 'item-0002-04', 'ing-0002-13'),

-- Ingredientes para Pudim de Leite (item-0002-05)
('ing-menu-0002-134', 'item-0002-05', 'ing-0002-14'),
('ing-menu-0002-133335', 'item-0002-05', 'ing-0002-15'),

-- Ingredientes para Patê de Atum (item-0002-06)
('ing-menu-0002-136', 'item-0002-06', 'ing-0002-16'),
('ing-menu-0002-137', 'item-0002-06', 'ing-0002-17'),

-- Ingredientes para Espaguete Carbonara (item-0002-07)
('ing-menu-0002-138', 'item-0002-07', 'ing-0002-18'),
('ing-menu-0002-099', 'item-0002-07', 'ing-0002-04'),
('ing-menu-0002-000', 'item-0002-07', 'ing-0002-08'),
('ing-menu-0002-139', 'item-0002-07', 'ing-0002-19'),

-- Ingredientes para Picanha Grelhada (item-0002-08)
('ing-menu-0002-091', 'item-0002-08', 'ing-0002-09'),
('ing-menu-0002-131', 'item-0002-08', 'ing-0002-10'),

-- Ingredientes para Refrigerante (item-0002-09)
('ing-menu-0002-112', 'item-0002-09', 'ing-0002-12'),
('ing-menu-0002-132', 'item-0002-09', 'ing-0002-13'),

-- Ingredientes para Pudim de Leite (item-0002-10)
('ing-menu-0002-314', 'item-0002-10', 'ing-0002-14'),
('ing-menu-0002-135', 'item-0002-10', 'ing-0002-15');

-- Restaurante 3
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0003', 'Paladar Refinado', 'Alta gastronomia em ambiente sofisticado.', 'Rua Gourmet, 789', '(31) 99887-6655', '11222333000144', '112233445', 'https://example.com/images/paladar_refinado.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0003-01', 'Entradas Especiais', '1a2b3c4d-0003', NOW(), NOW()),
('cat-0003-02', 'Massas Frescas', '1a2b3c4d-0003', NOW(), NOW()),
('cat-0003-03', 'Aves Nobres', '1a2b3c4d-0003', NOW(), NOW()),
('cat-0003-04', 'Bebidas Premium', '1a2b3c4d-0003', NOW(), NOW()),
('cat-0003-05', 'Sobremesas Exclusivas', '1a2b3c4d-0003', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0003-01', 'Carpaccio de Salmão', 'Finas fatias de salmão com molho cítrico.', 45.00, NULL, 'cat-0003-01', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-02', 'Ravioli de Mozzarella', 'Massa recheada com queijo e molho de tomate fresco.', 38.00, NULL, 'cat-0003-02', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-03', 'Pato Confitado', 'Pato cozido lentamente em sua própria gordura.', 75.00, NULL, 'cat-0003-03', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-04', 'Vinho Tinto Reserva', 'Vinho importado de safra especial.', 120.00, NULL, 'cat-0003-04', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-05', 'Crème Brûlée de Lavanda', 'Clássica sobremesa francesa com toque floral.', 28.00, NULL, 'cat-0003-05', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-06', 'Bruschetta', 'Pão italiano com tomate e manjericão.', 17.00, NULL, 'cat-0003-01', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-07', 'Penne Quatro Queijos', 'Massa com mix de queijos especiais.', 30.00, NULL, 'cat-0003-02', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-08', 'Medalhão de Frango', 'Filé de frango enrolado no bacon.', 38.00, NULL, 'cat-0003-03', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-09', 'Água Mineral', 'Água sem gás.', 5.00, NULL, 'cat-0003-04', '1a2b3c4d-0003', NOW(), NOW()),
('item-0003-10', 'Mousse de Chocolate', 'Mousse cremosa com raspas de chocolate.', 16.50, NULL, 'cat-0003-05', '1a2b3c4d-0003', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0003-01', 'Salmão', NOW(), NOW()),
('ing-0003-02', 'Limão', NOW(), NOW()),
('ing-0003-03', 'Azeite', NOW(), NOW()),
('ing-0003-04', 'Massa de ravioli', NOW(), NOW()),
('ing-0003-05', 'Mozzarella', NOW(), NOW()),
('ing-0003-06', 'Tomate', NOW(), NOW()),
('ing-0003-07', 'Pato', NOW(), NOW()),
('ing-0003-08', 'Gordura de pato', NOW(), NOW()),
('ing-0003-09', 'Vinho tinto', NOW(), NOW()),
('ing-0003-10', 'Creme de leite', NOW(), NOW()),
('ing-0003-11', 'Açúcar', NOW(), NOW()),
('ing-0003-12', 'Lavanda', NOW(), NOW()),
('ing-0003-13', 'Pão italiano', NOW(), NOW()),
('ing-0003-14', 'Manjericão', NOW(), NOW()),
('ing-0003-15', 'Penne', NOW(), NOW()),
('ing-0003-16', 'Queijo', NOW(), NOW()),
('ing-0003-17', 'Frango', NOW(), NOW()),
('ing-0003-18', 'Bacon', NOW(), NOW()),
('ing-0003-19', 'Água', NOW(), NOW()),
('ing-0003-20', 'Chocolate', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Carpaccio de Salmão (item-0003-01)
('ing-menu-0003-01a', 'item-0003-01', 'ing-0003-01'),
('ing-menu-0003-02a', 'item-0003-01', 'ing-0003-02'),
('ing-menu-0003-03a', 'item-0003-01', 'ing-0003-03'),

-- Ingredientes para Ravioli de Mozzarella (item-0003-02)
('ing-menu-0003-04a', 'item-0003-02', 'ing-0003-04'),
('ing-menu-0003-05a', 'item-0003-02', 'ing-0003-05'),
('ing-menu-0003-06a', 'item-0003-02', 'ing-0003-06'),

-- Ingredientes para Pato Confitado (item-0003-03)
('ing-menu-0003-07a', 'item-0003-03', 'ing-0003-07'),
('ing-menu-0003-08a', 'item-0003-03', 'ing-0003-08'),

-- Ingredientes para Vinho Tinto Reserva (item-0003-04)
('ing-menu-0003-09', 'item-0003-04', 'ing-0003-09'),

-- Ingredientes para Crème Brûlée de Lavanda (item-0003-05)
('ing-menu-0003-10a', 'item-0003-05', 'ing-0003-10'),
('ing-menu-0003-11a', 'item-0003-05', 'ing-0003-11'),
('ing-menu-0003-12a', 'item-0003-05', 'ing-0003-12'),

-- Ingredientes para Bruschetta (item-0003-06)
('ing-menu-0003-13a', 'item-0003-06', 'ing-0003-13'),
('ing-menu-00a03-06a', 'item-0003-06', 'ing-0003-06'),
('ing-menu-0003-14a', 'item-0003-06', 'ing-0003-14'),

-- Ingredientes para Penne Quatro Queijos (item-0003-07)
('ing-menu-0003-15a', 'item-0003-07', 'ing-0003-15'),
('ing-menu-0003-16a', 'item-0003-07', 'ing-0003-16'),

-- Ingredientes para Medalhão de Frango (item-0003-08)
('ing-menu-0003-17a', 'item-0003-08', 'ing-0003-17'),
('ing-menu-0003-1a8', 'item-0003-08', 'ing-0003-18'),

-- Ingredientes para Água Mineral (item-0003-09)
('ing-menu-0003-19a', 'item-0003-09', 'ing-0003-19'),

-- Ingredientes para Mousse de Chocolate (item-0003-10)
('ing-menu-0003-2a0', 'item-0003-10', 'ing-0003-20');

-- Restaurante 4
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0004', 'Tempero Caseiro', 'Comida caseira com gostinho de infância.', 'Rua da Saudade, 1010', '(12) 98888-7777', '22333444000155', '223344556', 'https://example.com/images/tempero_caseiro.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0004-01', 'Petiscos', '1a2b3c4d-0004', NOW(), NOW()),
('cat-0004-02', 'Massas Artesanais', '1a2b3c4d-0004', NOW(), NOW()),
('cat-0004-03', 'Assados', '1a2b3c4d-0004', NOW(), NOW()),
('cat-0004-04', 'Sucos Naturais', '1a2b3c4d-0004', NOW(), NOW()),
('cat-0004-05', 'Doces da Vovó', '1a2b3c4d-0004', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0004-01', 'Isca de Peixe', 'Tiras de peixe empanadas.', 32.00, NULL, 'cat-0004-01', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-02', 'Rondelli de Ricota', 'Massa recheada com ricota e espinafre.', 40.00, NULL, 'cat-0004-02', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-03', 'Costela no Bafo', 'Costela bovina assada lentamente.', 60.00, NULL, 'cat-0004-03', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-04', 'Suco de Morango', 'Morango batido com água ou leite.', 10.00, NULL, 'cat-0004-04', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-05', 'Arroz Doce', 'Arroz cozido com leite e canela.', 18.00, NULL, 'cat-0004-05', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-06', 'Bolinho de Bacalhau', 'Salgado frito de bacalhau desfiado.', 18.00, NULL, 'cat-0004-01', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-07', 'Nhoque ao Sugo', 'Massa de batata com molho de tomate.', 29.00, NULL, 'cat-0004-02', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-08', 'Lombo Assado', 'Lombo suíno marinado e assado.', 43.00, NULL, 'cat-0004-03', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-09', 'Chá Mate Natural', 'Chá gelado sem açúcar.', 7.50, NULL, 'cat-0004-04', '1a2b3c4d-0004', NOW(), NOW()),
('item-0004-10', 'Tiramisu', 'Sobremesa italiana com café.', 20.00, NULL, 'cat-0004-05', '1a2b3c4d-0004', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0004-01', 'Peixe', NOW(), NOW()),
('ing-0004-02', 'Farinha', NOW(), NOW()),
('ing-0004-03', 'Ovo', NOW(), NOW()),
('ing-0004-04', 'Massa de rondelli', NOW(), NOW()),
('ing-0004-05', 'Ricota', NOW(), NOW()),
('ing-0004-06', 'Espinafre', NOW(), NOW()),
('ing-0004-07', 'Costela bovina', NOW(), NOW()),
('ing-0004-08', 'Morango', NOW(), NOW()),
('ing-0004-09', 'Leite', NOW(), NOW()),
('ing-0004-10', 'Arroz', NOW(), NOW()),
('ing-0004-11', 'Leite', NOW(), NOW()),
('ing-0004-12', 'Canela', NOW(), NOW()),
('ing-0004-13', 'Bacalhau', NOW(), NOW()),
('ing-0004-14', 'Batata', NOW(), NOW()),
('ing-0004-15', 'Massa de nhoque', NOW(), NOW()),
('ing-0004-16', 'Tomate', NOW(), NOW()),
('ing-0004-17', 'Lombo suíno', NOW(), NOW()),
('ing-0004-18', 'Chá mate', NOW(), NOW()),
('ing-0004-19', 'Café', NOW(), NOW()),
('ing-0004-20', 'Queijo mascarpone', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Isca de Peixe (item-0004-01)
('ing-menu-0004-01b', 'item-0004-01', 'ing-0004-01'),
('ing-menu-0004-02b', 'item-0004-01', 'ing-0004-02'),
('ing-menu-000b4-03', 'item-0004-01', 'ing-0004-03'),

-- Ingredientes para Rondelli de Ricota (item-0004-02)
('ing-menu-0004b-04', 'item-0004-02', 'ing-0004-04'),
('ing-menu-0004-0b5', 'item-0004-02', 'ing-0004-05'),
('ing-menu-0004-b06', 'item-0004-02', 'ing-0004-06'),

-- Ingredientes para Costela no Bafo (item-0004-03)
('ing-menbu-0004-07', 'item-0004-03', 'ing-0004-07'),

-- Ingredientes para Suco de Morango (item-0004-04)
('ing-menub-0004-08', 'item-0004-04', 'ing-0004-08'),
('ing-menu-0004-09', 'item-0004-04', 'ing-0004-09'),

-- Ingredientes para Arroz Doce (item-0004-05)
('ing-menu-b0004-10', 'item-0004-05', 'ing-0004-10'),
('ing-menu-0004-11', 'item-0004-05', 'ing-0004-11'),
('ing-menu-0004-12', 'item-0004-05', 'ing-0004-12'),

-- Ingredientes para Bolinho de Bacalhau (item-0004-06)
('ing-menu-0b004-13', 'item-0004-06', 'ing-0004-13'),
('ing-menu-00b04-14', 'item-0004-06', 'ing-0004-14'),

-- Ingredientes para Nhoque ao Sugo (item-0004-07)
('ing-menu-000b4b-15', 'item-0004-07', 'ing-0004-15'),
('ing-menu-0004bb-16', 'item-0004-07', 'ing-0004-16'),

-- Ingredientes para Lombo Assado (item-0004-08)
('ing-menu-0004-1b7', 'item-0004-08', 'ing-0004-17'),

-- Ingredientes para Chá Mate Natural (item-0004-09)
('ing-menu-000b4b-18', 'item-0004-09', 'ing-0004-18'),

-- Ingredientes para Tiramisu (item-0004-10)
('ing-menu-00b04-b19', 'item-0004-10', 'ing-0004-19'),
('ing-menu-00b04b-20', 'item-0004-10', 'ing-0004-20');

-- Restaurante 5
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0005', 'Cantinho Italiano', 'Massas frescas e pizzas artesanais.', 'Av. Itália, 2020', '(41) 97777-6543', '33444555000166', '334455667', 'https://example.com/images/cantinho_italiano.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0005-01', 'Antipasti', '1a2b3c4d-0005', NOW(), NOW()),
('cat-0005-02', 'Paste', '1a2b3c4d-0005', NOW(), NOW()),
('cat-0005-03', 'Secondi Piatti', '1a2b3c4d-0005', NOW(), NOW()),
('cat-0005-04', 'Bevande', '1a2b3c4d-0005', NOW(), NOW()),
('cat-0005-05', 'Dolci', '1a2b3c4d-0005', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0005-01', 'Carpaccio', 'Finas fatias de carne com molho especial.', 48.00, NULL, 'cat-0005-01', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-02', 'Ravioli de Espinafre', 'Massa recheada com espinafre e ricota.', 35.00, NULL, 'cat-0005-02', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-03', 'Ossobuco', 'Carne de vitela com molho de tomate.', 65.00, NULL, 'cat-0005-03', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-04', 'Vinho da Casa', 'Vinho tinto ou branco.', 40.00, NULL, 'cat-0005-04', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-05', 'Torta Caprese', 'Torta de chocolate e amêndoas.', 22.00, NULL, 'cat-0005-05', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-06', 'Croquete de Carne', 'Petisco frito recheado de carne.', 14.00, NULL, 'cat-0005-01', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-07', 'Lasagna Bolonhesa', 'Massa ao molho bolonhesa e queijo.', 35.00, NULL, 'cat-0005-02', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-08', 'Cordeiro ao Vinho', 'Cordeiro assado com molho de vinho.', 62.00, NULL, 'cat-0005-03', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-09', 'Cerveja Artesanal', 'Otima cerveja artezanal', 12.00, NULL, 'cat-0005-04', '1a2b3c4d-0005', NOW(), NOW()),
('item-0005-10', 'Petit Gateau', 'Bolo quente com sorvete.', 25.00, NULL, 'cat-0005-05', '1a2b3c4d-0005', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0005-01', 'Carne', NOW(), NOW()),
('ing-0005-02', 'Molho especial', NOW(), NOW()),
('ing-0005-03', 'Massa de ravioli', NOW(), NOW()),
('ing-0005-04', 'Espinafre', NOW(), NOW()),
('ing-0005-05', 'Ricota', NOW(), NOW()),
('ing-0005-06', 'Vitela', NOW(), NOW()),
('ing-0005-07', 'Molho de tomate', NOW(), NOW()),
('ing-0005-08', 'Vinho', NOW(), NOW()),
('ing-0005-09', 'Chocolate', NOW(), NOW()),
('ing-0005-10', 'Amêndoas', NOW(), NOW()),
('ing-0005-11', 'Carne', NOW(), NOW()),
('ing-0005-12', 'Farinha', NOW(), NOW()),
('ing-0005-13', 'Massa de lasanha', NOW(), NOW()),
('ing-0005-14', 'Molho bolonhesa', NOW(), NOW()),
('ing-0005-15', 'Queijo', NOW(), NOW()),
('ing-0005-16', 'Cordeiro', NOW(), NOW()),
('ing-0005-17', 'Cerveja', NOW(), NOW()),
('ing-0005-18', 'Bolo', NOW(), NOW()),
('ing-0005-19', 'Sorvete', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Carpaccio (item-0005-01)
(UUID(), 'item-0005-01', 'ing-0005-01'),
(UUID(), 'item-0005-01', 'ing-0005-02'),

-- Ingredientes para Ravioli de Espinafre (item-0005-02)
(UUID(), 'item-0005-02', 'ing-0005-03'),
(UUID(), 'item-0005-02', 'ing-0005-04'),
(UUID(), 'item-0005-02', 'ing-0005-05'),

-- Ingredientes para Ossobuco (item-0005-03)
(UUID(), 'item-0005-03', 'ing-0005-06'),
(UUID(), 'item-0005-03', 'ing-0005-07'),

-- Ingredientes para Vinho da Casa (item-0005-04)
(UUID(), 'item-0005-04', 'ing-0005-08'),

-- Ingredientes para Torta Caprese (item-0005-05)
(UUID(), 'item-0005-05', 'ing-0005-09'),
(UUID(), 'item-0005-05', 'ing-0005-10'),

-- Ingredientes para Croquete de Carne (item-0005-06)
(UUID(), 'item-0005-06', 'ing-0005-11'),
(UUID(), 'item-0005-06', 'ing-0005-12'),

-- Ingredientes para Lasagna Bolonhesa (item-0005-07)
(UUID(), 'item-0005-07', 'ing-0005-13'),
(UUID(), 'item-0005-07', 'ing-0005-14'),
(UUID(), 'item-0005-07', 'ing-0005-15'),

-- Ingredientes para Cordeiro ao Vinho (item-0005-08)
(UUID(), 'item-0005-08', 'ing-0005-16'),
(UUID(), 'item-0005-08', 'ing-0005-08'),

-- Ingredientes para Cerveja Artesanal (item-0005-09)
(UUID(), 'item-0005-09', 'ing-0005-17'),

-- Ingredientes para Petit Gateau (item-0005-10)
(UUID(), 'item-0005-10', 'ing-0005-18'),
(UUID(), 'item-0005-10', 'ing-0005-19');


-- Restaurante 6
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0006', 'Delícias do Chef', 'Criações exclusivas assinadas por chefs renomados.', 'Alameda Gourmet, 456', '(61) 91234-8765', '55666777000188', '778899001', 'https://example.com/images/delicias_chef.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0006-01', 'Entradas', '1a2b3c4d-0006', NOW(), NOW()),
('cat-0006-02', 'Massas', '1a2b3c4d-0006', NOW(), NOW()),
('cat-0006-03', 'Carnes', '1a2b3c4d-0006', NOW(), NOW()),
('cat-0006-04', 'Bebidas', '1a2b3c4d-0006', NOW(), NOW()),
('cat-0006-05', 'Sobremesas', '1a2b3c4d-0006', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0006-01', 'Carpaccio de Carne', 'Fatias finas de carne temperadas com molho especial.', 29.00, NULL, 'cat-0006-01', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-02', 'Penne ao Pesto', 'Massa ao molho pesto de manjericão.', 26.90, NULL, 'cat-0006-02', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-03', 'Costelinha Suína', 'Costelinha suína assada ao molho barbecue.', 49.00, NULL, 'cat-0006-03', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-04', 'Limonada Suíça', 'Limonada cremosa com leite condensado.', 10.00, NULL, 'cat-0006-04', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-05', 'Mousse de Maracujá', 'Mousse cremosa com calda de maracujá.', 15.00, NULL, 'cat-0006-05', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-06', 'Carpaccio de Abacaxi', 'Carpaccio de abacaxi com sorvete de coco.', 29.00, NULL, 'cat-0006-01', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-07', 'Espaguete ao Frutos do Mar', 'Espaguete com camarões, lulas e mexilhões.', 59.90, NULL, 'cat-0006-02', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-08', 'Filé Mignon com Crosta de Castanhas', 'Filé mignon com crosta de castanhas e molho de vinho tinto.', 69.00, NULL, 'cat-0006-03', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-09', 'Drink da Casa', 'Drink especial do chef.', 10.00, NULL, 'cat-0006-04', '1a2b3c4d-0006', NOW(), NOW()),
('item-0006-10', 'Crème Brûlée de Lavanda', 'Crème brûlée com infusão de lavanda.', 15.00, NULL, 'cat-0006-05', '1a2b3c4d-0006', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0006-01', 'Carne', NOW(), NOW()),
('ing-0006-02', 'Molho especial', NOW(), NOW()),
('ing-0006-03', 'Massa penne', NOW(), NOW()),
('ing-0006-04', 'Molho pesto', NOW(), NOW()),
('ing-0006-05', 'Costelinha suína', NOW(), NOW()),
('ing-0006-06', 'Molho barbecue', NOW(), NOW()),
('ing-0006-07', 'Limão', NOW(), NOW()),
('ing-0006-08', 'Leite condensado', NOW(), NOW()),
('ing-0006-09', 'Maracujá', NOW(), NOW()),
('ing-0006-10', 'Abacaxi', NOW(), NOW()),
('ing-0006-11', 'Sorvete de coco', NOW(), NOW()),
('ing-0006-12', 'Espaguete', NOW(), NOW()),
('ing-0006-13', 'Frutos do mar', NOW(), NOW()),
('ing-0006-14', 'Filé mignon', NOW(), NOW()),
('ing-0006-15', 'Castanhas', NOW(), NOW()),
('ing-0006-16', 'Vinho tinto', NOW(), NOW()),
('ing-0006-17', 'Ingredientes secretos', NOW(), NOW()),
('ing-0006-18', 'Lavanda', NOW(), NOW()),
('ing-0006-19', 'Creme', NOW(), NOW()),
('ing-0006-20', 'Açúcar', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Carpaccio de Carne (item-0006-01)
(UUID(), 'item-0006-01', 'ing-0006-01'),
(UUID(), 'item-0006-01', 'ing-0006-02'),

-- Ingredientes para Penne ao Pesto (item-0006-02)
(UUID(), 'item-0006-02', 'ing-0006-03'),
(UUID(), 'item-0006-02', 'ing-0006-04'),

-- Ingredientes para Costelinha Suína (item-0006-03)
(UUID(), 'item-0006-03', 'ing-0006-05'),
(UUID(), 'item-0006-03', 'ing-0006-06'),

-- Ingredientes para Limonada Suíça (item-0006-04)
(UUID(), 'item-0006-04', 'ing-0006-07'),
(UUID(), 'item-0006-04', 'ing-0006-08'),

-- Ingredientes para Mousse de Maracujá (item-0006-05)
(UUID(), 'item-0006-05', 'ing-0006-09'),

-- Ingredientes para Carpaccio de Abacaxi (item-0006-06)
(UUID(), 'item-0006-06', 'ing-0006-10'),
(UUID(), 'item-0006-06', 'ing-0006-11'),

-- Ingredientes para Espaguete ao Frutos do Mar (item-0006-07)
(UUID(), 'item-0006-07', 'ing-0006-12'),
(UUID(), 'item-0006-07', 'ing-0006-13'),

-- Ingredientes para Filé Mignon com Crosta de Castanhas (item-0006-08)
(UUID(), 'item-0006-08', 'ing-0006-14'),
(UUID(), 'item-0006-08', 'ing-0006-15'),
(UUID(), 'item-0006-08', 'ing-0006-16'),

-- Ingredientes para Drink da Casa (item-0006-09)
(UUID(), 'item-0006-09', 'ing-0006-17'),

-- Ingredientes para Crème Brûlée de Lavanda (item-0006-10)
(UUID(), 'item-0006-10', 'ing-0006-18'),
(UUID(), 'item-0006-10', 'ing-0006-19'),
(UUID(), 'item-0006-10', 'ing-0006-20');

-- Restaurante 7
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0007', 'Bistrô Elegante', 'Ambiente refinado com pratos clássicos.', 'Rua dos Bistrôs, 654', '(71) 99876-5432', '33444555000111', '445566778', 'https://example.com/images/bistro_elegante.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0007-01', 'Entradas', '1a2b3c4d-0007', NOW(), NOW()),
('cat-0007-02', 'Massas', '1a2b3c4d-0007', NOW(), NOW()),
('cat-0007-03', 'Carnes', '1a2b3c4d-0007', NOW(), NOW()),
('cat-0007-04', 'Bebidas', '1a2b3c4d-0007', NOW(), NOW()),
('cat-0007-05', 'Sobremesas', '1a2b3c4d-0007', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0007-01', 'Bolinho de Queijo', 'Bolinho frito recheado com queijo derretido.', 14.00, NULL, 'cat-0007-01', '1a2b3c4d-0007', NOW(), NOW()),
('item-0007-02', 'Tagliatelle ao Funghi', 'Massa com molho cremoso de cogumelos.', 31.50, NULL, 'cat-0007-02', '1a2b3c4d-0007', NOW(), NOW()),
('item-0007-03', 'T-Bone Steak', 'Corte especial grelhado com legumes.', 55.00, NULL, 'cat-0007-03', '1a2b3c4d-0007', NOW(), NOW()),
('item-0007-04', 'Mate Gelado', 'Chá mate gelado com limão.', 7.50, NULL, 'cat-0007-04', '1a2b3c4d-0007', NOW(), NOW()),
('item-0007-05', 'Brownie de Chocolate', 'Brownie de chocolate com sorvete.', 17.00, NULL, 'cat-0007-05', '1a2b3c4d-0007', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0007-01', 'Queijo', NOW(), NOW()),
('ing-0007-02', 'Massa tagliatelle', NOW(), NOW()),
('ing-0007-03', 'Cogumelos', NOW(), NOW()),
('ing-0007-04', 'Carne T-bone', NOW(), NOW()),
('ing-0007-05', 'Legumes', NOW(), NOW()),
('ing-0007-06', 'Chá mate', NOW(), NOW()),
('ing-0007-07', 'Limão', NOW(), NOW()),
('ing-0007-08', 'Chocolate', NOW(), NOW()),
('ing-0007-09', 'Sorvete', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Bolinho de Queijo (item-0007-01)
(UUID(), 'item-0007-01', 'ing-0007-01'),

-- Ingredientes para Tagliatelle ao Funghi (item-0007-02)
(UUID(), 'item-0007-02', 'ing-0007-02'),
(UUID(), 'item-0007-02', 'ing-0007-03'),

-- Ingredientes para T-Bone Steak (item-0007-03)
(UUID(), 'item-0007-03', 'ing-0007-04'),
(UUID(), 'item-0007-03', 'ing-0007-05'),

-- Ingredientes para Mate Gelado (item-0007-04)
(UUID(), 'item-0007-04', 'ing-0007-06'),
(UUID(), 'item-0007-04', 'ing-0007-07'),

-- Ingredientes para Brownie de Chocolate (item-0007-05)
(UUID(), 'item-0007-05', 'ing-0007-08'),
(UUID(), 'item-0007-05', 'ing-0007-09');

-- Restaurante 8
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0008', 'Comida & Tradição', 'Receitas tradicionais com ingredientes frescos.', 'Av. dos Sabores, 111', '(81) 94567-1234', '77888999000122', '889900112', 'https://example.com/images/comida_tradicao.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0008-01', 'Entradas', '1a2b3c4d-0008', NOW(), NOW()),
('cat-0008-02', 'Massas', '1a2b3c4d-0008', NOW(), NOW()),
('cat-0008-03', 'Carnes', '1a2b3c4d-0008', NOW(), NOW()),
('cat-0008-04', 'Bebidas', '1a2b3c4d-0008', NOW(), NOW()),
('cat-0008-05', 'Sobremesas', '1a2b3c4d-0008', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0008-01', 'Camarão Empanado', 'Camarões empanados crocantes.', 38.00, NULL, 'cat-0008-01', '1a2b3c4d-0008', NOW(), NOW()),
('item-0008-02', 'Spaghetti ao Pomodoro', 'Massa ao molho de tomate fresco.', 24.90, NULL, 'cat-0008-02', '1a2b3c4d-0008', NOW(), NOW()),
('item-0008-03', 'Frango Grelhado', 'Filé de frango grelhado com arroz e salada.', 33.00, NULL, 'cat-0008-03', '1a2b3c4d-0008', NOW(), NOW()),
('item-0008-04', 'Refrigerante Zero', 'Coca-Cola ou Guaraná sem açúcar.', 6.50, NULL, 'cat-0008-04', '1a2b3c4d-0008', NOW(), NOW()),
('item-0008-05', 'Sorvete Artesanal', 'Sorvete de fabricação própria.', 12.00, NULL, 'cat-0008-05', '1a2b3c4d-0008', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0008-01', 'Camarão', NOW(), NOW()),
('ing-0008-02', 'Massa spaghetti', NOW(), NOW()),
('ing-0008-03', 'Tomate fresco', NOW(), NOW()),
('ing-0008-04', 'Filé de frango', NOW(), NOW()),
('ing-0008-05', 'Arroz', NOW(), NOW()),
('ing-0008-06', 'Salada', NOW(), NOW()),
('ing-0008-07', 'Coca-Cola Zero', NOW(), NOW()),
('ing-0008-08', 'Guaraná Zero', NOW(), NOW()),
('ing-0008-09', 'Leite', NOW(), NOW()),
('ing-0008-10', 'Frutas', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Camarão Empanado (item-0008-01)
(UUID(), 'item-0008-01', 'ing-0008-01'),

-- Ingredientes para Spaghetti ao Pomodoro (item-0008-02)
(UUID(), 'item-0008-02', 'ing-0008-02'),
(UUID(), 'item-0008-02', 'ing-0008-03'),

-- Ingredientes para Frango Grelhado (item-0008-03)
(UUID(), 'item-0008-03', 'ing-0008-04'),
(UUID(), 'item-0008-03', 'ing-0008-05'),
(UUID(), 'item-0008-03', 'ing-0008-06'),

-- Ingredientes para Refrigerante Zero (item-0008-04)
(UUID(), 'item-0008-04', 'ing-0008-07'),
(UUID(), 'item-0008-04', 'ing-0008-08'),

-- Ingredientes para Sorvete Artesanal (item-0008-05)
(UUID(), 'item-0008-05', 'ing-0008-09'),
(UUID(), 'item-0008-05', 'ing-0008-10');

-- Restaurante 9
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0009', 'Mar & Terra', 'Especialidades em frutos do mar e carnes nobres.', 'Rua dos Navegantes, 987', '(91) 93456-7890', '88999000000133', '990001113', 'https://example.com/images/mar_terra.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0009-01', 'Entradas', '1a2b3c4d-0009', NOW(), NOW()),
('cat-0009-02', 'Massas', '1a2b3c4d-0009', NOW(), NOW()),
('cat-0009-03', 'Frutos do Mar', '1a2b3c4d-0009', NOW(), NOW()),
('cat-0009-04', 'Carnes', '1a2b3c4d-0009', NOW(), NOW()),
('cat-0009-05', 'Sobremesas', '1a2b3c4d-0009', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0009-01', 'Casquinha de Siri', 'Siri desfiado gratinado.', 22.00, NULL, 'cat-0009-01', '1a2b3c4d-0009', NOW(), NOW()),
('item-0009-02', 'Linguine ao Pesto', 'Massa com molho pesto e camarões.', 42.50, NULL, 'cat-0009-02', '1a2b3c4d-0009', NOW(), NOW()),
('item-0009-03', 'Moqueca de Camarão', 'Moqueca capixaba com arroz e pirão.', 58.00, NULL, 'cat-0009-03', '1a2b3c4d-0009', NOW(), NOW()),
('item-0009-04', 'Filé Mignon ao Molho Madeira', 'Filé mignon com molho madeira e purê.', 55.00, NULL, 'cat-0009-04', '1a2b3c4d-0009', NOW(), NOW()),
('item-0009-05', 'Petit Gâteau', 'Bolo de chocolate com sorvete.', 25.00, NULL, 'cat-0009-05', '1a2b3c4d-0009', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0009-01', 'Siri', NOW(), NOW()),
('ing-0009-02', 'Massa linguine', NOW(), NOW()),
('ing-0009-03', 'Molho pesto', NOW(), NOW()),
('ing-0009-04', 'Camarão', NOW(), NOW()),
('ing-0009-05', 'Peixe', NOW(), NOW()),
('ing-0009-06', 'Arroz', NOW(), NOW()),
('ing-0009-07', 'Pirão', NOW(), NOW()),
('ing-0009-08', 'Filé mignon', NOW(), NOW()),
('ing-0009-09', 'Molho madeira', NOW(), NOW()),
('ing-0009-10', 'Purê', NOW(), NOW()),
('ing-0009-11', 'Chocolate', NOW(), NOW()),
('ing-0009-12', 'Sorvete', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Casquinha de Siri (item-0009-01)
(UUID(), 'item-0009-01', 'ing-0009-01'),

-- Ingredientes para Linguine ao Pesto (item-0009-02)
(UUID(), 'item-0009-02', 'ing-0009-02'),
(UUID(), 'item-0009-02', 'ing-0009-03'),
(UUID(), 'item-0009-02', 'ing-0009-04'),

-- Ingredientes para Moqueca de Camarão (item-0009-03)
(UUID(), 'item-0009-03', 'ing-0009-04'),
(UUID(), 'item-0009-03', 'ing-0009-05'),
(UUID(), 'item-0009-03', 'ing-0009-06'),
(UUID(), 'item-0009-03', 'ing-0009-07'),

-- Ingredientes para Filé Mignon ao Molho Madeira (item-0009-04)
(UUID(), 'item-0009-04', 'ing-0009-08'),
(UUID(), 'item-0009-04', 'ing-0009-09'),
(UUID(), 'item-0009-04', 'ing-0009-10'),

-- Ingredientes para Petit Gâteau (item-0009-05)
(UUID(), 'item-0009-05', 'ing-0009-11'),
(UUID(), 'item-0009-05', 'ing-0009-12');


-- Restaurante 10
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0010', 'Sabores Rusticos', 'Comida rústica com ingredientes orgânicos.', 'Estrada da Roça, km 50', '(22) 92345-6789', '99000111000144', '112233446', 'https://example.com/images/sabores_fazenda.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0010-01', 'Entradas Rústicas', '1a2b3c4d-0010', NOW(), NOW()),
('cat-0010-02', 'Massas Caseiras', '1a2b3c4d-0010', NOW(), NOW()),
('cat-0010-03', 'Carnes da Roça', '1a2b3c4d-0010', NOW(), NOW()),
('cat-0010-04', 'Bebidas Naturais', '1a2b3c4d-0010', NOW(), NOW()),
('cat-0010-05', 'Doces da Vovó', '1a2b3c4d-0010', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0010-01', 'Pão de Queijo Recheado', 'Pão de queijo com recheio de pernil.', 18.00, NULL, 'cat-0010-01', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-02', 'Capeletti de Abóbora', 'Massa recheada com abóbora e especiarias.', 32.00, NULL, 'cat-0010-02', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-03', 'Leitão Assado', 'Leitão assado com batatas rústicas.', 65.00, NULL, 'cat-0010-03', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-04', 'Suco de Milho Verde', 'Suco cremoso de milho verde.', 12.00, NULL, 'cat-0010-04', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-05', 'Doce de Abóbora com Coco', 'Doce de abóbora caseiro com coco ralado.', 15.00, NULL, 'cat-0010-05', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-06', 'Pastel de Angu', 'Pastel de fubá de milho recheado com carne.', 20.00, NULL, 'cat-0010-01', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-07', 'Nhoque de Mandioca', 'Nhoque de mandioca com molho de carne seca.', 38.00, NULL, 'cat-0010-02', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-08', 'Costela com Mandioca', 'Costela cozida com mandioca na manteiga de garrafa.', 58.00, NULL, 'cat-0010-03', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-09', 'Chá de Erva Mate com Limão', 'Chá mate quente ou gelado.', 8.00, NULL, 'cat-0010-04', '1a2b3c4d-0010', NOW(), NOW()),
('item-0010-10', 'Arroz Doce Queimado', 'Arroz doce com açúcar queimado.', 16.00, NULL, 'cat-0010-05', '1a2b3c4d-0010', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0010-01', 'Pão de queijo', NOW(), NOW()),
('ing-0010-02', 'Pernil', NOW(), NOW()),
('ing-0010-03', 'Massa capeletti', NOW(), NOW()),
('ing-0010-04', 'Abóbora', NOW(), NOW()),
('ing-0010-05', 'Especiarias', NOW(), NOW()),
('ing-0010-06', 'Leitão', NOW(), NOW()),
('ing-0010-07', 'Batata', NOW(), NOW()),
('ing-0010-08', 'Milho verde', NOW(), NOW()),
('ing-0010-09', 'Abóbora', NOW(), NOW()),
('ing-0010-10', 'Coco ralado', NOW(), NOW()),
('ing-0010-11', 'Fubá de milho', NOW(), NOW()),
('ing-0010-12', 'Carne', NOW(), NOW()),
('ing-0010-13', 'Mandioca', NOW(), NOW()),
('ing-0010-14', 'Molho de carne seca', NOW(), NOW()),
('ing-0010-15', 'Costela', NOW(), NOW()),
('ing-0010-16', 'Manteiga de garrafa', NOW(), NOW()),
('ing-0010-17', 'Erva mate', NOW(), NOW()),
('ing-0010-18', 'Limão', NOW(), NOW()),
('ing-0010-19', 'Arroz', NOW(), NOW()),
('ing-0010-20', 'Açúcar', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Pão de Queijo Recheado (item-0010-01)
(UUID(), 'item-0010-01', 'ing-0010-01'),
(UUID(), 'item-0010-01', 'ing-0010-02'),

-- Ingredientes para Capeletti de Abóbora (item-0010-02)
(UUID(), 'item-0010-02', 'ing-0010-03'),
(UUID(), 'item-0010-02', 'ing-0010-04'),
(UUID(), 'item-0010-02', 'ing-0010-05'),

-- Ingredientes para Leitão Assado (item-0010-03)
(UUID(), 'item-0010-03', 'ing-0010-06'),
(UUID(), 'item-0010-03', 'ing-0010-07'),

-- Ingredientes para Suco de Milho Verde (item-0010-04)
(UUID(), 'item-0010-04', 'ing-0010-08'),

-- Ingredientes para Doce de Abóbora com Coco (item-0010-05)
(UUID(), 'item-0010-05', 'ing-0010-09'),
(UUID(), 'item-0010-05', 'ing-0010-10'),

-- Ingredientes para Pastel de Angu (item-0010-06)
(UUID(), 'item-0010-06', 'ing-0010-11'),
(UUID(), 'item-0010-06', 'ing-0010-12'),

-- Ingredientes para Nhoque de Mandioca (item-0010-07)
(UUID(), 'item-0010-07', 'ing-0010-13'),
(UUID(), 'item-0010-07', 'ing-0010-14'),

-- Ingredientes para Costela com Mandioca (item-0010-08)
(UUID(), 'item-0010-08', 'ing-0010-15'),
(UUID(), 'item-0010-08', 'ing-0010-16'),

-- Ingredientes para Chá de Erva Mate com Limão (item-0010-09)
(UUID(), 'item-0010-09', 'ing-0010-17'),
(UUID(), 'item-0010-09', 'ing-0010-18'),

-- Ingredientes para Arroz Doce Queimado (item-0010-10)
(UUID(), 'item-0010-10', 'ing-0010-19'),
(UUID(), 'item-0010-10', 'ing-0010-20');

-- Restaurante 11
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0011', 'Green Heaven', 'Culinária vegana criativa e saborosa.', 'Rua da Saúde, 321', '(33) 93456-6543', '12122323000177', '223344557', 'https://example.com/images/green_heaven.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0011-01', 'Entradas Veganas', '1a2b3c4d-0011', NOW(), NOW()),
('cat-0011-02', 'Pratos Principais Veganos', '1a2b3c4d-0011', NOW(), NOW()),
('cat-0011-03', 'Burgers Veganos', '1a2b3c4d-0011', NOW(), NOW()),
('cat-0011-04', 'Sucos e Smoothies', '1a2b3c4d-0011', NOW(), NOW()),
('cat-0011-05', 'Sobremesas Veganas', '1a2b3c4d-0011', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0011-01', 'Bruschetta de Cogumelos', 'Pão integral com cogumelos salteados.', 22.00, NULL, 'cat-0011-01', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-02', 'Lasanha de Berinjela', 'Lasanha com camadas de berinjela e ricota vegana.', 38.00, NULL, 'cat-0011-02', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-03', 'Burger de Grão de Bico', 'Burger com pão integral e maionese vegana.', 35.00, NULL, 'cat-0011-03', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-04', 'Smoothie de Frutas Vermelhas', 'Smoothie com morango, framboesa e amora.', 18.00, NULL, 'cat-0011-04', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-05', 'Torta de Chocolate Vegana', 'Torta de chocolate com base de castanhas.', 25.00, NULL, 'cat-0011-05', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-06', 'Guacamole com Chips', 'Guacamole com chips de batata doce.', 28.00, NULL, 'cat-0011-01', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-07', 'Curry de Legumes', 'Curry de legumes com leite de coco e arroz integral.', 42.00, NULL, 'cat-0011-02', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-08', 'Burger de Lentilha', 'Burger com pão de espinafre e cheddar vegano.', 37.00, NULL, 'cat-0011-03', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-09', 'Suco Verde Detox', 'Suco com couve, maçã verde e gengibre.', 15.00, NULL, 'cat-0011-04', '1a2b3c4d-0011', NOW(), NOW()),
('item-0011-10', 'Mousse de Maracujá Vegano', 'Mousse de maracujá com leite de castanha de caju.', 22.00, NULL, 'cat-0011-05', '1a2b3c4d-0011', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0011-01', 'Pão integral', NOW(), NOW()),
('ing-0011-02', 'Cogumelo', NOW(), NOW()),
('ing-0011-03', 'Berinjela', NOW(), NOW()),
('ing-0011-04', 'Ricota vegana', NOW(), NOW()),
('ing-0011-05', 'Grão de bico', NOW(), NOW()),
('ing-0011-06', 'Maionese vegana', NOW(), NOW()),
('ing-0011-07', 'Morango', NOW(), NOW()),
('ing-0011-08', 'Framboesa', NOW(), NOW()),
('ing-0011-09', 'Amora', NOW(), NOW()),
('ing-0011-10', 'Chocolate vegano', NOW(), NOW()),
('ing-0011-11', 'Castanha', NOW(), NOW()),
('ing-0011-12', 'Abacate', NOW(), NOW()),
('ing-0011-13', 'Batata doce', NOW(), NOW()),
('ing-0011-14', 'Legumes', NOW(), NOW()),
('ing-0011-15', 'Leite de coco', NOW(), NOW()),
('ing-0011-16', 'Arroz integral', NOW(), NOW()),
('ing-0011-17', 'Lentilha', NOW(), NOW()),
('ing-0011-18', 'Pão de espinafre', NOW(), NOW()),
('ing-0011-19', 'Cheddar vegano', NOW(), NOW()),
('ing-0011-20', 'Couve', NOW(), NOW()),
('ing-0011-21', 'Maçã verde', NOW(), NOW()),
('ing-0011-22', 'Gengibre', NOW(), NOW()),
('ing-0011-23', 'Maracujá', NOW(), NOW()),
('ing-0011-24', 'Leite de castanha de caju', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Bruschetta de Cogumelos (item-0011-01)
(UUID(), 'item-0011-01', 'ing-0011-01'),
(UUID(), 'item-0011-01', 'ing-0011-02'),

-- Ingredientes para Lasanha de Berinjela (item-0011-02)
(UUID(), 'item-0011-02', 'ing-0011-03'),
(UUID(), 'item-0011-02', 'ing-0011-04'),

-- Ingredientes para Burger de Grão de Bico (item-0011-03)
(UUID(), 'item-0011-03', 'ing-0011-05'),
(UUID(), 'item-0011-03', 'ing-0011-06'),

-- Ingredientes para Smoothie de Frutas Vermelhas (item-0011-04)
(UUID(), 'item-0011-04', 'ing-0011-07'),
(UUID(), 'item-0011-04', 'ing-0011-08'),
(UUID(), 'item-0011-04', 'ing-0011-09'),

-- Ingredientes para Torta de Chocolate Vegana (item-0011-05)
(UUID(), 'item-0011-05', 'ing-0011-10'),
(UUID(), 'item-0011-05', 'ing-0011-11'),

-- Ingredientes para Guacamole com Chips (item-0011-06)
(UUID(), 'item-0011-06', 'ing-0011-12'),
(UUID(), 'item-0011-06', 'ing-0011-13'),

-- Ingredientes para Curry de Legumes (item-0011-07)
(UUID(), 'item-0011-07', 'ing-0011-14'),
(UUID(), 'item-0011-07', 'ing-0011-15'),
(UUID(), 'item-0011-07', 'ing-0011-16'),

-- Ingredientes para Burger de Lentilha (item-0011-08)
(UUID(), 'item-0011-08', 'ing-0011-17'),
(UUID(), 'item-0011-08', 'ing-0011-18'),
(UUID(), 'item-0011-08', 'ing-0011-19'),

-- Ingredientes para Suco Verde Detox (item-0011-09)
(UUID(), 'item-0011-09', 'ing-0011-20'),
(UUID(), 'item-0011-09', 'ing-0011-21'),
(UUID(), 'item-0011-09', 'ing-0011-22'),

-- Ingredientes para Mousse de Maracujá Vegano (item-0011-10)
(UUID(), 'item-0011-10', 'ing-0011-23'),
(UUID(), 'item-0011-10', 'ing-0011-24');

-- Restaurante 12
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0012', 'Oriente Saboroso', 'Delícias da culinária oriental com um toque moderno.', 'Rua do Comércio, 404', '(44) 98888-7777', '13133434000188', '334455668', 'https://example.com/images/oriente_saboroso.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0012-01', 'Sushi e Sashimi', '1a2b3c4d-0012', NOW(), NOW()),
('cat-0012-02', 'Pratos Quentes Orientais', '1a2b3c4d-0012', NOW(), NOW()),
('cat-0012-03', 'Aperitivos Orientais', '1a2b3c4d-0012', NOW(), NOW()),
('cat-0012-04', 'Bebidas Orientais', '1a2b3c4d-0012', NOW(), NOW()),
('cat-0012-05', 'Sobremesas Orientais', '1a2b3c4d-0012', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0012-01', 'Combinado de Sushi Premium', 'Variedade de sushis e sashimis frescos.', 65.00, NULL, 'cat-0012-01', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-02', 'Yakisoba de Frango', 'Macarrão com frango e legumes salteados.', 42.00, NULL, 'cat-0012-02', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-03', 'Guioza de Carne', 'Pastéis recheados com carne e temperos.', 28.00, NULL, 'cat-0012-03', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-04', 'Saquê Importado', 'Saquê tradicional japonês.', 35.00, NULL, 'cat-0012-04', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-05', 'Mochi de Chocolate', 'Bolinhos de arroz com recheio de chocolate.', 20.00, NULL, 'cat-0012-05', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-06', 'Temaki Salmão Completo', 'Cone de alga com salmão, cream cheese e cebolinha.', 32.00, NULL, 'cat-0012-01', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-07', 'Frango Xadrez', 'Frango com pimentões e amendoim.', 48.00, NULL, 'cat-0012-02', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-08', 'Harumaki de Queijo', 'Rolinhos primavera recheados com queijo.', 25.00, NULL, 'cat-0012-03', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-09', 'Chá de Jasmim', 'Chá aromático de jasmim.', 12.00, NULL, 'cat-0012-04', '1a2b3c4d-0012', NOW(), NOW()),
('item-0012-10', 'Tempurá de Sorvete', 'Sorvete frito com calda doce.', 23.00, NULL, 'cat-0012-05', '1a2b3c4d-0012', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0012-01', 'Arroz japonês', NOW(), NOW()),
('ing-0012-02', 'Alga nori', NOW(), NOW()),
('ing-0012-03', 'Salmão fresco', NOW(), NOW()),
('ing-0012-04', 'Atum fresco', NOW(), NOW()),
('ing-0012-05', 'Pepino', NOW(), NOW()),
('ing-0012-06', 'Abacate', NOW(), NOW()),
('ing-0012-07', 'Macarrão para yakisoba', NOW(), NOW()),
('ing-0012-08', 'Frango', NOW(), NOW()),
('ing-0012-09', 'Legumes variados', NOW(), NOW()),
('ing-0012-10', 'Carne moída', NOW(), NOW()),
('ing-0012-11', 'Massa de guioza', NOW(), NOW()),
('ing-0012-12', 'Saquê', NOW(), NOW()),
('ing-0012-13', 'Chocolate', NOW(), NOW()),
('ing-0012-14', 'Arroz mochi', NOW(), NOW()),
('ing-0012-15', 'Cream cheese', NOW(), NOW()),
('ing-0012-16', 'Cebolinha', NOW(), NOW()),
('ing-0012-17', 'Pimentão', NOW(), NOW()),
('ing-0012-18', 'Amendoim', NOW(), NOW()),
('ing-0012-19', 'Massa de harumaki', NOW(), NOW()),
('ing-0012-20', 'Queijo', NOW(), NOW()),
('ing-0012-21', 'Jasmim', NOW(), NOW()),
('ing-0012-22', 'Sorvete', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Combinado de Sushi Premium (item-0012-01)
(UUID(), 'item-0012-01', 'ing-0012-01'),
(UUID(), 'item-0012-01', 'ing-0012-02'),
(UUID(), 'item-0012-01', 'ing-0012-03'),
(UUID(), 'item-0012-01', 'ing-0012-04'),
(UUID(), 'item-0012-01', 'ing-0012-05'),
(UUID(), 'item-0012-01', 'ing-0012-06'),

-- Ingredientes para Yakisoba de Frango (item-0012-02)
(UUID(), 'item-0012-02', 'ing-0012-07'),
(UUID(), 'item-0012-02', 'ing-0012-08'),
(UUID(), 'item-0012-02', 'ing-0012-09'),

-- Ingredientes para Guioza de Carne (item-0012-03)
(UUID(), 'item-0012-03', 'ing-0012-10'),
(UUID(), 'item-0012-03', 'ing-0012-11'),

-- Ingredientes para Saquê Importado (item-0012-04)
(UUID(), 'item-0012-04', 'ing-0012-12'),

-- Ingredientes para Mochi de Chocolate (item-0012-05)
(UUID(), 'item-0012-05', 'ing-0012-13'),
(UUID(), 'item-0012-05', 'ing-0012-14'),

-- Ingredientes para Temaki Salmão Completo (item-0012-06)
(UUID(), 'item-0012-06', 'ing-0012-02'),
(UUID(), 'item-0012-06', 'ing-0012-03'),
(UUID(), 'item-0012-06', 'ing-0012-15'),
(UUID(), 'item-0012-06', 'ing-0012-16'),

-- Ingredientes para Frango Xadrez (item-0012-07)
(UUID(), 'item-0012-07', 'ing-0012-08'),
(UUID(), 'item-0012-07', 'ing-0012-17'),
(UUID(), 'item-0012-07', 'ing-0012-18'),

-- Ingredientes para Harumaki de Queijo (item-0012-08)
(UUID(), 'item-0012-08', 'ing-0012-19'),
(UUID(), 'item-0012-08', 'ing-0012-20'),

-- Ingredientes para Chá de Jasmim (item-0012-09)
(UUID(), 'item-0012-09', 'ing-0012-21'),

-- Ingredientes para Tempurá de Sorvete (item-0012-10)
(UUID(), 'item-0012-10', 'ing-0012-22');

-- Restaurante 13
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0013', 'Especiarias da Índia', 'Autênticos sabores da Índia com temperos exóticos.', 'Rua das Especiarias, 321', '(43) 99999-0000', '14144545000199', '445566779', 'https://example.com/images/especiarias_india.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0013-01', 'Entradas Indianas', '1a2b3c4d-0013', NOW(), NOW()),
('cat-0013-02', 'Pratos Principais Vegetarianos', '1a2b3c4d-0013', NOW(), NOW()),
('cat-0013-03', 'Pratos Principais Não Vegetarianos', '1a2b3c4d-0013', NOW(), NOW()),
('cat-0013-04', 'Pães e Acompanhamentos', '1a2b3c4d-0013', NOW(), NOW()),
('cat-0013-05', 'Sobremesas e Bebidas Indianas', '1a2b3c4d-0013', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0013-01', 'Samosa', 'Pastéis triangulares recheados com batata e ervilha.', 25.00, NULL, 'cat-0013-01', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-02', 'Vegetable Curry', 'Curry de legumes variados com especiarias.', 40.00, NULL, 'cat-0013-02', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-03', 'Chicken Tikka Masala', 'Frango marinado em iogurte e especiarias, cozido em molho cremoso.', 45.00, NULL, 'cat-0013-03', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-04', 'Naan', 'Pão tradicional indiano assado no forno tandoor.', 10.00, NULL, 'cat-0013-04', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-05', 'Gulab Jamun', 'Bolinhos de leite fritos em calda de açúcar.', 18.00, NULL, 'cat-0013-05', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-06', 'Onion Bhaji', 'Anéis de cebola empanados em farinha de grão de bico.', 22.00, NULL, 'cat-0013-01', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-07', 'Palak Paneer', 'Cubos de queijo paneer com espinafre e especiarias.', 42.00, NULL, 'cat-0013-02', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-08', 'Lamb Curry', 'Carne de cordeiro cozida em molho curry.', 50.00, NULL, 'cat-0013-03', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-09', 'Garlic Naan', 'Pão naan com alho.', 12.00, NULL, 'cat-0013-04', '1a2b3c4d-0013', NOW(), NOW()),
('item-0013-10', 'Lassi de Manga', 'Bebida de iogurte com manga.', 15.00, NULL, 'cat-0013-05', '1a2b3c4d-0013', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0013-01', 'Batata', NOW(), NOW()),
('ing-0013-02', 'Ervilha', NOW(), NOW()),
('ing-0013-03', 'Farinha de trigo', NOW(), NOW()),
('ing-0013-04', 'Legumes variados', NOW(), NOW()),
('ing-0013-05', 'Especiarias indianas', NOW(), NOW()),
('ing-0013-06', 'Frango', NOW(), NOW()),
('ing-0013-07', 'Iogurte', NOW(), NOW()),
('ing-0013-08', 'Cebola', NOW(), NOW()),
('ing-0013-09', 'Farinha de grão de bico', NOW(), NOW()),
('ing-0013-10', 'Queijo paneer', NOW(), NOW()),
('ing-0013-11', 'Espinafre', NOW(), NOW()),
('ing-0013-12', 'Carne de cordeiro', NOW(), NOW()),
('ing-0013-13', 'Alho', NOW(), NOW()),
('ing-0013-14', 'Leite', NOW(), NOW()),
('ing-0013-15', 'Açúcar', NOW(), NOW()),
('ing-0013-16', 'Manga', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Samosa (item-0013-01)
(UUID(), 'item-0013-01', 'ing-0013-01'),
(UUID(), 'item-0013-01', 'ing-0013-02'),
(UUID(), 'item-0013-01', 'ing-0013-03'),
(UUID(), 'item-0013-01', 'ing-0013-05'),

-- Ingredientes para Vegetable Curry (item-0013-02)
(UUID(), 'item-0013-02', 'ing-0013-04'),
(UUID(), 'item-0013-02', 'ing-0013-05'),

-- Ingredientes para Chicken Tikka Masala (item-0013-03)
(UUID(), 'item-0013-03', 'ing-0013-06'),
(UUID(), 'item-0013-03', 'ing-0013-07'),
(UUID(), 'item-0013-03', 'ing-0013-05'),

-- Ingredientes para Naan (item-0013-04)
(UUID(), 'item-0013-04', 'ing-0013-03'),

-- Ingredientes para Gulab Jamun (item-0013-05)
(UUID(), 'item-0013-05', 'ing-0013-14'),
(UUID(), 'item-0013-05', 'ing-0013-15'),

-- Ingredientes para Onion Bhaji (item-0013-06)
(UUID(), 'item-0013-06', 'ing-0013-08'),
(UUID(), 'item-0013-06', 'ing-0013-09'),

-- Ingredientes para Palak Paneer (item-0013-07)
(UUID(), 'item-0013-07', 'ing-0013-10'),
(UUID(), 'item-0013-07', 'ing-0013-11'),
(UUID(), 'item-0013-07', 'ing-0013-05'),

-- Ingredientes para Lamb Curry (item-0013-08)
(UUID(), 'item-0013-08', 'ing-0013-12'),
(UUID(), 'item-0013-08', 'ing-0013-05'),

-- Ingredientes para Garlic Naan (item-0013-09)
(UUID(), 'item-0013-09', 'ing-0013-03'),
(UUID(), 'item-0013-09', 'ing-0013-13'),

-- Ingredientes para Lassi de Manga (item-0013-10)
(UUID(), 'item-0013-10', 'ing-0013-07'),
(UUID(), 'item-0013-10', 'ing-0013-16');

-- Restaurante 14
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0014', 'Oásis Refrescante', 'Variedade de bebidas naturais e refrescantes.', 'Avenida das Palmeiras, 555', '(45) 91111-2222', '15155656000100', '556677880', 'https://example.com/images/oasis_refrescante.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0014-01', 'Sucos Naturais', '1a2b3c4d-0014', NOW(), NOW()),
('cat-0014-02', 'Smoothies', '1a2b3c4d-0014', NOW(), NOW()),
('cat-0014-03', 'Vitaminas', '1a2b3c4d-0014', NOW(), NOW()),
('cat-0014-04', 'Chás Gelados', '1a2b3c4d-0014', NOW(), NOW()),
('cat-0014-05', 'Águas Aromatizadas', '1a2b3c4d-0014', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0014-01', 'Suco de Laranja com Acerola', 'Suco natural de laranja e acerola.', 12.00, NULL, 'cat-0014-01', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-02', 'Smoothie de Banana com Aveia', 'Smoothie nutritivo de banana e aveia.', 15.00, NULL, 'cat-0014-02', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-03', 'Vitamina de Abacate com Leite', 'Vitamina cremosa de abacate com leite.', 14.00, NULL, 'cat-0014-03', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-04', 'Chá Verde com Limão e Hortelã', 'Chá verde gelado com limão e hortelã.', 10.00, NULL, 'cat-0014-04', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-05', 'Água com Morango e Manjericão', 'Água aromatizada com morango e manjericão.', 8.00, NULL, 'cat-0014-05', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-06', 'Suco de Melancia com Gengibre', 'Suco refrescante de melancia e gengibre.', 13.00, NULL, 'cat-0014-01', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-07', 'Smoothie de Morango com Chia', 'Smoothie antioxidante de morango e chia.', 16.00, NULL, 'cat-0014-02', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-08', 'Vitamina de Mamão com Laranja', 'Vitamina energética de mamão e laranja.', 13.00, NULL, 'cat-0014-03', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-09', 'Chá de Hibisco com Canela', 'Chá de hibisco gelado com canela.', 11.00, NULL, 'cat-0014-04', '1a2b3c4d-0014', NOW(), NOW()),
('item-0014-10', 'Água com Abacaxi e Hortelã', 'Água aromatizada com abacaxi e hortelã.', 9.00, NULL, 'cat-0014-05', '1a2b3c4d-0014', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0014-01', 'Laranja', NOW(), NOW()),
('ing-0014-02', 'Acerola', NOW(), NOW()),
('ing-0014-03', 'Banana', NOW(), NOW()),
('ing-0014-04', 'Aveia', NOW(), NOW()),
('ing-0014-05', 'Abacate', NOW(), NOW()),
('ing-0014-06', 'Leite', NOW(), NOW()),
('ing-0014-07', 'Chá verde', NOW(), NOW()),
('ing-0014-08', 'Limão', NOW(), NOW()),
('ing-0014-09', 'Hortelã', NOW(), NOW()),
('ing-0014-10', 'Morango', NOW(), NOW()),
('ing-0014-11', 'Manjericão', NOW(), NOW()),
('ing-0014-12', 'Melancia', NOW(), NOW()),
('ing-0014-13', 'Gengibre', NOW(), NOW()),
('ing-0014-14', 'Chia', NOW(), NOW()),
('ing-0014-15', 'Mamão', NOW(), NOW()),
('ing-0014-16', 'Laranja', NOW(), NOW()),
('ing-0014-17', 'Hibisco', NOW(), NOW()),
('ing-0014-18', 'Canela', NOW(), NOW()),
('ing-0014-19', 'Abacaxi', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
-- Ingredientes para Suco de Laranja com Acerola (item-0014-01)
(UUID(), 'item-0014-01', 'ing-0014-01'),
(UUID(), 'item-0014-01', 'ing-0014-02'),

-- Ingredientes para Smoothie de Banana com Aveia (item-0014-02)
(UUID(), 'item-0014-02', 'ing-0014-03'),
(UUID(), 'item-0014-02', 'ing-0014-04'),
(UUID(), 'item-0014-02', 'ing-0014-06'),

-- Ingredientes para Vitamina de Abacate com Leite (item-0014-03)
(UUID(), 'item-0014-03', 'ing-0014-05'),
(UUID(), 'item-0014-03', 'ing-0014-06'),

-- Ingredientes para Chá Verde com Limão e Hortelã (item-0014-04)
(UUID(), 'item-0014-04', 'ing-0014-07'),
(UUID(), 'item-0014-04', 'ing-0014-08'),
(UUID(), 'item-0014-04', 'ing-0014-09'),

-- Ingredientes para Água com Morango e Manjericão (item-0014-05)
(UUID(), 'item-0014-05', 'ing-0014-10'),
(UUID(), 'item-0014-05', 'ing-0014-11'),

-- Ingredientes para Suco de Melancia com Gengibre (item-0014-06)
(UUID(), 'item-0014-06', 'ing-0014-12'),
(UUID(), 'item-0014-06', 'ing-0014-13'),

-- Ingredientes para Smoothie de Morango com Chia (item-0014-07)
(UUID(), 'item-0014-07', 'ing-0014-10'),
(UUID(), 'item-0014-07', 'ing-0014-14'),
(UUID(), 'item-0014-07', 'ing-0014-06'),

-- Ingredientes para Vitamina de Mamão com Laranja (item-0014-08)
(UUID(), 'item-0014-08', 'ing-0014-15'),
(UUID(), 'item-0014-08', 'ing-0014-16'),
(UUID(), 'item-0014-08', 'ing-0014-06'),

-- Ingredientes para Chá de Hibisco com Canela (item-0014-09)
(UUID(), 'item-0014-09', 'ing-0014-17'),
(UUID(), 'item-0014-09', 'ing-0014-18'),

-- Ingredientes para Água com Abacaxi e Hortelã (item-0014-10)
(UUID(), 'item-0014-10', 'ing-0014-19'),
(UUID(), 'item-0014-10', 'ing-0014-09');

-- Restaurante 15
INSERT INTO restaurants (id, name, description, address, phone, cnpj, ie, image_url, created_at, updated_at) VALUES
('1a2b3c4d-0015', 'Piazzaria', 'Pizzas artesanais com ingredientes selecionados.', 'Av. Forno a Lenha, 303', '(85) 92222-3344', '50999000000111', '509988770', 'https://example.com/images/piazzaria.jpg', NOW(), NOW());

INSERT INTO categories (id, name, restaurant_id, created_at, updated_at) VALUES
('cat-0015-01', 'Pizzas Tradicionais', '1a2b3c4d-0015', NOW(), NOW()),
('cat-0015-02', 'Pizzas Especiais', '1a2b3c4d-0015', NOW(), NOW()),
('cat-0015-03', 'Calzones', '1a2b3c4d-0015', NOW(), NOW()),
('cat-0015-04', 'Bebidas', '1a2b3c4d-0015', NOW(), NOW()),
('cat-0015-05', 'Sobremesas', '1a2b3c4d-0015', NOW(), NOW());

INSERT INTO menu_items (id, name, description, price, image_url, category_id, restaurant_id, created_at, updated_at) VALUES
('item-0015-01', 'Pizza Margherita', 'Molho de tomate, mussarela e manjericão.', 45.00, NULL, 'cat-0015-01', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-02', 'Pizza Pepperoni', 'Molho de tomate, mussarela e pepperoni.', 48.00, NULL, 'cat-0015-01', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-03', 'Pizza Quatro Queijos', 'Molho de tomate, mussarela, provolone, parmesão e gorgonzola.', 52.00, NULL, 'cat-0015-01', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-04', 'Pizza Frango com Catupiry', 'Molho de tomate, mussarela, frango desfiado e catupiry.', 50.00, NULL, 'cat-0015-01', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-05', 'Pizza Portuguesa', 'Molho de tomate, mussarela, presunto, ovos, cebola e azeitonas.', 49.00, NULL, 'cat-0015-01', '1a2b3c4d-0015', NOW(), NOW()),

('item-0015-06', 'Pizza Siciliana', 'Molho de tomate, mussarela, aliche, tomate seco e rúcula.', 55.00, NULL, 'cat-0015-02', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-07', 'Pizza Abobrinha com Brie', 'Molho branco, mussarela, abobrinha grelhada e queijo brie.', 58.00, NULL, 'cat-0015-02', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-08', 'Pizza Camarão com Alho Poró', 'Molho branco, mussarela, camarões e alho poró.', 62.00, NULL, 'cat-0015-02', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-09', 'Pizza Cordeiro com Hortelã', 'Molho de tomate, mussarela, cordeiro desfiado e hortelã.', 60.00, NULL, 'cat-0015-02', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-10', 'Pizza Vegana', 'Molho de tomate, abobrinha, berinjela, pimentão e cebola.', 53.00, NULL, 'cat-0015-02', '1a2b3c4d-0015', NOW(), NOW()),

('item-0015-11', 'Calzone Tradicional', 'Massa recheada com molho de tomate, mussarela, presunto e champignon.', 48.00, NULL, 'cat-0015-03', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-12', 'Calzone Frango com Catupiry', 'Massa recheada com molho de tomate, mussarela, frango e catupiry.', 50.00, NULL, 'cat-0015-03', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-13', 'Calzone Quatro Queijos', 'Massa recheada com molho de tomate e mix de queijos.', 52.00, NULL, 'cat-0015-03', '1a2b3c4d-0015', NOW(), NOW()),

('item-0015-14', 'Refrigerante', 'Coca-Cola, Guaraná, Fanta.', 7.00, NULL, 'cat-0015-04', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-15', 'Suco Natural', 'Laranja, Abacaxi, Morango.', 10.00, NULL, 'cat-0015-04', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-16', 'Cerveja Long Neck', 'Heineken, Stella Artois, Budweiser.', 12.00, NULL, 'cat-0015-04', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-17', 'Vinho Tinto', 'Taça de Vinho da Casa.', 15.00, NULL, 'cat-0015-04', '1a2b3c4d-0015', NOW(), NOW()),

('item-0015-18', 'Tiramisu', 'Sobremesa italiana com café e mascarpone.', 22.00, NULL, 'cat-0015-05', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-19', 'Panna Cotta', 'Sobremesa italiana com calda de frutas vermelhas.', 20.00, NULL, 'cat-0015-05', '1a2b3c4d-0015', NOW(), NOW()),
('item-0015-20', 'Petit Gateau', 'Bolo de chocolate com sorvete.', 25.00, NULL, 'cat-0015-05', '1a2b3c4d-0015', NOW(), NOW());

INSERT INTO ingredients (id, name, created_at, updated_at) VALUES
('ing-0015-01', 'Molho de tomate', NOW(), NOW()),
('ing-0015-02', 'Mussarela', NOW(), NOW()),
('ing-0015-03', 'Manjericão', NOW(), NOW()),
('ing-0015-04', 'Pepperoni', NOW(), NOW()),
('ing-0015-05', 'Provolone', NOW(), NOW()),
('ing-0015-06', 'Parmesão', NOW(), NOW()),
('ing-0015-07', 'Gorgonzola', NOW(), NOW()),
('ing-0015-08', 'Frango desfiado', NOW(), NOW()),
('ing-0015-09', 'Catupiry', NOW(), NOW()),
('ing-0015-10', 'Presunto', NOW(), NOW()),
('ing-0015-11', 'Ovos', NOW(), NOW()),
('ing-0015-12', 'Cebola', NOW(), NOW()),
('ing-0015-13', 'Azeitonas', NOW(), NOW()),
('ing-0015-14', 'Aliche', NOW(), NOW()),
('ing-0015-15', 'Tomate seco', NOW(), NOW()),
('ing-0015-16', 'Rúcula', NOW(), NOW()),
('ing-0015-17', 'Molho branco', NOW(), NOW()),
('ing-0015-18', 'Abobrinha grelhada', NOW(), NOW()),
('ing-0015-19', 'Queijo brie', NOW(), NOW()),
('ing-0015-20', 'Camarões', NOW(), NOW()),
('ing-0015-21', 'Alho poró', NOW(), NOW()),
('ing-0015-22', 'Cordeiro desfiado', NOW(), NOW()),
('ing-0015-23', 'Hortelã', NOW(), NOW()),
('ing-0015-24', 'Abobrinha', NOW(), NOW()),
('ing-0015-25', 'Berinjela', NOW(), NOW()),
('ing-0015-26', 'Pimentão', NOW(), NOW()),
('ing-0015-27', 'Massa de pizza', NOW(), NOW()),
('ing-0015-28', 'Champignon', NOW(), NOW()),
('ing-0015-29', 'Coca-Cola', NOW(), NOW()),
('ing-0015-30', 'Guaraná', NOW(), NOW()),
('ing-0015-31', 'Fanta', NOW(), NOW()),
('ing-0015-32', 'Laranja', NOW(), NOW()),
('ing-0015-33', 'Abacaxi', NOW(), NOW()),
('ing-0015-34', 'Morango', NOW(), NOW()),
('ing-0015-35', 'Heineken', NOW(), NOW()),
('ing-0015-36', 'Stella Artois', NOW(), NOW()),
('ing-0015-37', 'Budweiser', NOW(), NOW()),
('ing-0015-38', 'Vinho tinto', NOW(), NOW()),
('ing-0015-39', 'Café', NOW(), NOW()),
('ing-0015-40', 'Mascarpone', NOW(), NOW()),
('ing-0015-41', 'Calda de frutas vermelhas', NOW(), NOW()),
('ing-0015-42', 'Chocolate', NOW(), NOW()),
('ing-0015-43', 'Sorvete', NOW(), NOW());

INSERT INTO menu_items_ingredients (id, menu_item_id, ingredient_id) VALUES
(UUID(), 'item-0015-01', 'ing-0015-01'),
(UUID(), 'item-0015-01', 'ing-0015-02'),
(UUID(), 'item-0015-01', 'ing-0015-03'),
(UUID(), 'item-0015-01', 'ing-0015-27'),

(UUID(), 'item-0015-02', 'ing-0015-01'),
(UUID(), 'item-0015-02', 'ing-0015-02'),
(UUID(), 'item-0015-02', 'ing-0015-04'),
(UUID(), 'item-0015-02', 'ing-0015-27'),

(UUID(), 'item-0015-03', 'ing-0015-01'),
(UUID(), 'item-0015-03', 'ing-0015-02'),
(UUID(), 'item-0015-03', 'ing-0015-05'),
(UUID(), 'item-0015-03', 'ing-0015-06'),
(UUID(), 'item-0015-03', 'ing-0015-07'),
(UUID(), 'item-0015-03', 'ing-0015-27'),

(UUID(), 'item-0015-04', 'ing-0015-01'),
(UUID(), 'item-0015-04', 'ing-0015-02'),
(UUID(), 'item-0015-04', 'ing-0015-08'),
(UUID(), 'item-0015-04', 'ing-0015-09'),
(UUID(), 'item-0015-04', 'ing-0015-27'),

(UUID(), 'item-0015-05', 'ing-0015-01'),
(UUID(), 'item-0015-05', 'ing-0015-02'),
(UUID(), 'item-0015-05', 'ing-0015-10'),
(UUID(), 'item-0015-05', 'ing-0015-11'),
(UUID(), 'item-0015-05', 'ing-0015-12'),
(UUID(), 'item-0015-05', 'ing-0015-13'),
(UUID(), 'item-0015-05', 'ing-0015-27'),

(UUID(), 'item-0015-06', 'ing-0015-01'),
(UUID(), 'item-0015-06', 'ing-0015-02'),
(UUID(), 'item-0015-06', 'ing-0015-14'),
(UUID(), 'item-0015-06', 'ing-0015-15'),
(UUID(), 'item-0015-06', 'ing-0015-16'),
(UUID(), 'item-0015-06', 'ing-0015-27'),

(UUID(), 'item-0015-07', 'ing-0015-17'),
(UUID(), 'item-0015-07', 'ing-0015-02'),
(UUID(), 'item-0015-07', 'ing-0015-18'),
(UUID(), 'item-0015-07', 'ing-0015-19'),
(UUID(), 'item-0015-07', 'ing-0015-27'),

(UUID(), 'item-0015-08', 'ing-0015-17'),
(UUID(), 'item-0015-08', 'ing-0015-02'),
(UUID(), 'item-0015-08', 'ing-0015-20'),
(UUID(), 'item-0015-08', 'ing-0015-21'),
(UUID(), 'item-0015-08', 'ing-0015-27'),

(UUID(), 'item-0015-09', 'ing-0015-01'),
(UUID(), 'item-0015-09', 'ing-0015-02'),
(UUID(), 'item-0015-09', 'ing-0015-22'),
(UUID(), 'item-0015-09', 'ing-0015-23'),
(UUID(), 'item-0015-09', 'ing-0015-27'),

(UUID(), 'item-0015-10', 'ing-0015-01'),
(UUID(), 'item-0015-10', 'ing-0015-24'),
(UUID(), 'item-0015-10', 'ing-0015-25'),
(UUID(), 'item-0015-10', 'ing-0015-26'),
(UUID(), 'item-0015-10', 'ing-0015-27'),

(UUID(), 'item-0015-11', 'ing-0015-01'),
(UUID(), 'item-0015-11', 'ing-0015-02'),
(UUID(), 'item-0015-11', 'ing-0015-10'),
(UUID(), 'item-0015-11', 'ing-0015-28'),
(UUID(), 'item-0015-11', 'ing-0015-27'),

(UUID(), 'item-0015-12', 'ing-0015-01'),
(UUID(), 'item-0015-12', 'ing-0015-02'),
(UUID(), 'item-0015-12', 'ing-0015-08'),
(UUID(), 'item-0015-12', 'ing-0015-09'),
(UUID(), 'item-0015-12', 'ing-0015-27'),

(UUID(), 'item-0015-13', 'ing-0015-01'),
(UUID(), 'item-0015-13', 'ing-0015-02'),
(UUID(), 'item-0015-13', 'ing-0015-05'),
(UUID(), 'item-0015-13', 'ing-0015-06'),
(UUID(), 'item-0015-13', 'ing-0015-07'),
(UUID(), 'item-0015-13', 'ing-0015-27'),

(UUID(), 'item-0015-14', 'ing-0015-29'),
(UUID(), 'item-0015-14', 'ing-0015-30'),
(UUID(), 'item-0015-14', 'ing-0015-31'),

(UUID(), 'item-0015-15', 'ing-0015-32'),
(UUID(), 'item-0015-15', 'ing-0015-33'),
(UUID(), 'item-0015-15', 'ing-0015-34'),

(UUID(), 'item-0015-16', 'ing-0015-35'),
(UUID(), 'item-0015-16', 'ing-0015-36'),
(UUID(), 'item-0015-16', 'ing-0015-37'),

(UUID(), 'item-0015-17', 'ing-0015-38'),

(UUID(), 'item-0015-18', 'ing-0015-39'),
(UUID(), 'item-0015-18', 'ing-0015-40'),

(UUID(), 'item-0015-19', 'ing-0015-41'),

(UUID(), 'item-0015-20', 'ing-0015-42'),
(UUID(), 'item-0015-20', 'ing-0015-43');

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Gastronomia+Suprema',
  cover_url = 'https://placehold.co/1980x300?text=Gastronomia+Suprema'
WHERE id = '1a2b3c4d-0002';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Paladar+Refinado',
  cover_url = 'https://placehold.co/1980x300?text=Paladar+Refinado'
WHERE id = '1a2b3c4d-0003';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Tempero+Caseiro',
  cover_url = 'https://placehold.co/1980x300?text=Tempero+Caseiro'
WHERE id = '1a2b3c4d-0004';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Cantinho+Italiano',
  cover_url = 'https://placehold.co/1980x300?text=Cantinho+Italiano'
WHERE id = '1a2b3c4d-0005';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Delícias+do+Chef',
  cover_url = 'https://placehold.co/1980x300?text=Delícias+do+Chef'
WHERE id = '1a2b3c4d-0006';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Bistrô+Elegante',
  cover_url = 'https://placehold.co/1980x300?text=Bistrô+Elegante'
WHERE id = '1a2b3c4d-0007';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Comida+%26+Tradição',
  cover_url = 'https://placehold.co/1980x300?text=Comida+%26+Tradição'
WHERE id = '1a2b3c4d-0008';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Mar+%26+Terra',
  cover_url = 'https://placehold.co/1980x300?text=Mar+%26+Terra'
WHERE id = '1a2b3c4d-0009';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Sabores+Rústicos',
  cover_url = 'https://placehold.co/1980x300?text=Sabores+Rústicos'
WHERE id = '1a2b3c4d-0010';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Green+Heaven',
  cover_url = 'https://placehold.co/1980x300?text=Green+Heaven'
WHERE id = '1a2b3c4d-0011';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Oriente+Saboroso',
  cover_url = 'https://placehold.co/1980x300?text=Oriente+Saboroso'
WHERE id = '1a2b3c4d-0012';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Especiarias+da+Índia',
  cover_url = 'https://placehold.co/1980x300?text=Especiarias+da+Índia'
WHERE id = '1a2b3c4d-0013';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Oásis+Refrescante',
  cover_url = 'https://placehold.co/1980x300?text=Oásis+Refrescante'
WHERE id = '1a2b3c4d-0014';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Piazzaria',
  cover_url = 'https://placehold.co/1980x300?text=Piazzaria'
WHERE id = '1a2b3c4d-0015';

UPDATE restaurants SET 
  image_url = 'https://placehold.co/200x200?text=Sabor+da+Fazenda',
  cover_url = 'https://placehold.co/1980x300?text=Sabor+da+Fazenda'
WHERE id = 'res-001';



UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Bolinho+de+Bacalhau' WHERE id = 'item-0002-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Lasanha+Bolonhesa' WHERE id = 'item-0002-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Picanha+Grelhada' WHERE id = 'item-0002-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Refrigerante+Lata' WHERE id = 'item-0002-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pudim+de+Leite' WHERE id = 'item-0002-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Patê+de+Atum' WHERE id = 'item-0002-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Espaguete+Carbonara' WHERE id = 'item-0002-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Picanha+Grelhada' WHERE id = 'item-0002-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Refrigerante' WHERE id = 'item-0002-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pudim+de+Leite' WHERE id = 'item-0002-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Carpaccio+de+Salmão' WHERE id = 'item-0003-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Ravioli+de+Mozzarella' WHERE id = 'item-0003-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pato+Confitado' WHERE id = 'item-0003-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Vinho+Tinto+Reserva' WHERE id = 'item-0003-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Crème+Brûlée+de+Lavanda' WHERE id = 'item-0003-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Bruschetta' WHERE id = 'item-0003-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Penne+Quatro+Queijos' WHERE id = 'item-0003-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Medalhão+de+Frango' WHERE id = 'item-0003-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Água+Mineral' WHERE id = 'item-0003-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Mousse+de+Chocolate' WHERE id = 'item-0003-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Isca+de+Peixe' WHERE id = 'item-0004-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Rondelli+de+Ricota' WHERE id = 'item-0004-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Costela+no+Bafo' WHERE id = 'item-0004-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Suco+de+Morango' WHERE id = 'item-0004-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Arroz+Doce' WHERE id = 'item-0004-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Bolinho+de+Bacalhau' WHERE id = 'item-0004-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Nhoque+ao+Sugo' WHERE id = 'item-0004-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Lombo+Assado' WHERE id = 'item-0004-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Chá+Mate+Natural' WHERE id = 'item-0004-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Tiramisu' WHERE id = 'item-0004-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Carpaccio' WHERE id = 'item-0005-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Ravioli+de+Espinafre' WHERE id = 'item-0005-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Ossobuco' WHERE id = 'item-0005-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Vinho+da+Casa' WHERE id = 'item-0005-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Torta+Caprese' WHERE id = 'item-0005-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Croquete+de+Carne' WHERE id = 'item-0005-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Lasagna+Bolonhesa' WHERE id = 'item-0005-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Cordeiro+ao+Vinho' WHERE id = 'item-0005-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Cerveja+Artesanal' WHERE id = 'item-0005-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Petit+Gateau' WHERE id = 'item-0005-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Carpaccio+de+Carne' WHERE id = 'item-0006-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Penne+ao+Pesto' WHERE id = 'item-0006-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Costelinha+Suína' WHERE id = 'item-0006-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Limonada+Suíça' WHERE id = 'item-0006-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Mousse+de+Maracujá' WHERE id = 'item-0006-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Carpaccio+de+Abacaxi' WHERE id = 'item-0006-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Espaguete+ao+Frutos+do+Mar' WHERE id = 'item-0006-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Filé+Mignon+com+Crosta+de+Castanhas' WHERE id = 'item-0006-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Drink+da+Casa' WHERE id = 'item-0006-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Crème+Brûlée+de+Lavanda' WHERE id = 'item-0006-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Bolinho+de+Queijo' WHERE id = 'item-0007-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Tagliatelle+ao+Funghi' WHERE id = 'item-0007-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=T-Bone+Steak' WHERE id = 'item-0007-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Mate+Gelado' WHERE id = 'item-0007-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Brownie+de+Chocolate' WHERE id = 'item-0007-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Camarão+Empanado' WHERE id = 'item-0008-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Spaghetti+ao+Pomodoro' WHERE id = 'item-0008-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Frango+Grelhado' WHERE id = 'item-0008-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Refrigerante+Zero' WHERE id = 'item-0008-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Sorvete+Artesanal' WHERE id = 'item-0008-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Casquinha+de+Siri' WHERE id = 'item-0009-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Linguine+ao+Pesto' WHERE id = 'item-0009-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Moqueca+de+Camarão' WHERE id = 'item-0009-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Filé+Mignon+ao+Molho+Madeira' WHERE id = 'item-0009-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Petit+Gâteau' WHERE id = 'item-0009-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pão+de+Queijo+Recheado' WHERE id = 'item-0010-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Capeletti+de+Abóbora' WHERE id = 'item-0010-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Leitão+Assado' WHERE id = 'item-0010-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Suco+de+Milho+Verde' WHERE id = 'item-0010-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Doce+de+Abóbora+com+Coco' WHERE id = 'item-0010-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pastel+de+Angu' WHERE id = 'item-0010-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Nhoque+de+Mandioca' WHERE id = 'item-0010-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Costela+com+Mandioca' WHERE id = 'item-0010-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Chá+de+Erva+Mate+com+Limão' WHERE id = 'item-0010-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Arroz+Doce+Queimado' WHERE id = 'item-0010-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Bruschetta+de+Cogumelos' WHERE id = 'item-0011-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Lasanha+de+Berinjela' WHERE id = 'item-0011-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Burger+de+Grão+de+Bico' WHERE id = 'item-0011-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Smoothie+de+Frutas+Vermelhas' WHERE id = 'item-0011-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Torta+de+Chocolate+Vegana' WHERE id = 'item-0011-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Guacamole+com+Chips' WHERE id = 'item-0011-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Curry+de+Legumes' WHERE id = 'item-0011-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Burger+de+Lentilha' WHERE id = 'item-0011-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Suco+Verde+Detox' WHERE id = 'item-0011-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Mousse+de+Maracujá+Vegano' WHERE id = 'item-0011-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Combinado+de+Sushi+Premium' WHERE id = 'item-0012-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Yakisoba+de+Frango' WHERE id = 'item-0012-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Guioza+de+Carne' WHERE id = 'item-0012-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Saquê+Importado' WHERE id = 'item-0012-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Mochi+de+Chocolate' WHERE id = 'item-0012-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Temaki+Salmão+Completo' WHERE id = 'item-0012-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Frango+Xadrez' WHERE id = 'item-0012-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Harumaki+de+Queijo' WHERE id = 'item-0012-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Chá+de+Jasmim' WHERE id = 'item-0012-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Tempurá+de+Sorvete' WHERE id = 'item-0012-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Samosa' WHERE id = 'item-0013-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Vegetable+Curry' WHERE id = 'item-0013-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Chicken+Tikka+Masala' WHERE id = 'item-0013-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Naan' WHERE id = 'item-0013-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Gulab+Jamun' WHERE id = 'item-0013-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Onion+Bhaji' WHERE id = 'item-0013-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Palak+Paneer' WHERE id = 'item-0013-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Lamb+Curry' WHERE id = 'item-0013-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Garlic+Naan' WHERE id = 'item-0013-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Lassi+de+Manga' WHERE id = 'item-0013-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Suco+de+Laranja+com+Acerola' WHERE id = 'item-0014-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Smoothie+de+Banana+com+Aveia' WHERE id = 'item-0014-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Vitamina+de+Abacate+com+Leite' WHERE id = 'item-0014-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Chá+Verde+com+Limão+e+Hortelã' WHERE id = 'item-0014-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Água+com+Morango+e+Manjericão' WHERE id = 'item-0014-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Suco+de+Melancia+com+Gengibre' WHERE id = 'item-0014-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Smoothie+de+Morango+com+Chia' WHERE id = 'item-0014-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Vitamina+de+Mamão+com+Laranja' WHERE id = 'item-0014-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Chá+de+Hibisco+com+Canela' WHERE id = 'item-0014-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Água+com+Abacaxi+e+Hortelã' WHERE id = 'item-0014-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Margherita' WHERE id = 'item-0015-01';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Pepperoni' WHERE id = 'item-0015-02';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Quatro+Queijos' WHERE id = 'item-0015-03';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Frango+com+Catupiry' WHERE id = 'item-0015-04';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Portuguesa' WHERE id = 'item-0015-05';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Siciliana' WHERE id = 'item-0015-06';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Abobrinha+com+Brie' WHERE id = 'item-0015-07';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Camarão+com+Alho+Poró' WHERE id = 'item-0015-08';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Cordeiro+com+Hortelã' WHERE id = 'item-0015-09';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pizza+Vegana' WHERE id = 'item-0015-10';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Calzone+Tradicional' WHERE id = 'item-0015-11';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Calzone+Frango+com+Catupiry' WHERE id = 'item-0015-12';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Calzone+Quatro+Queijos' WHERE id = 'item-0015-13';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Refrigerante' WHERE id = 'item-0015-14';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Suco+Natural' WHERE id = 'item-0015-15';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Cerveja+Long+Neck' WHERE id = 'item-0015-16';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Vinho+Tinto' WHERE id = 'item-0015-17';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Tiramisu' WHERE id = 'item-0015-18';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Panna+Cotta' WHERE id = 'item-0015-19';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Petit+Gateau' WHERE id = 'item-0015-20';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Pão+de+Queijo+Mineiro+6+unidades' WHERE id = 'item-bra-001';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Torresmo+à+Mineira' WHERE id = 'item-bra-002';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Feijão+Tropeiro+Completo' WHERE id = 'item-bra-003';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Frango+com+Quiabo' WHERE id = 'item-bra-004';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Vaca+Atolada' WHERE id = 'item-bra-005';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Arroz+com+Pequi' WHERE id = 'item-bra-006';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Tutu+de+Feijão+à+Mineira' WHERE id = 'item-bra-007';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Couve+Refogada+com+Alho' WHERE id = 'item-bra-008';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Doce+de+Leite+com+Queijo' WHERE id = 'item-bra-009';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Bolo+de+Fubá+Cremoso' WHERE id = 'item-bra-010';
UPDATE menu_items SET image_url = 'https://placehold.co/200x200?text=Goiabada+com+Queijo+Romeu+e+Julieta' WHERE id = 'item-bra-011';

INSERT INTO users (id,name,email,password_hash,created_at,updated_at,profile,role) VALUES
	 ('57768dfb-0752-11f0-94fc-74563c7c997c','Otavio','teste@teste.com','$2a$10$7wOYdvYdUzw4u1ygN7Ebu.hP.3fCO4ycmfpubCpVKMXm0ubsuL7b6','2025-03-15 22:46:13','2025-03-22 15:36:32','','CLIENT');
