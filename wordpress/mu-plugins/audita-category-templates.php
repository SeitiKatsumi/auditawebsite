<?php
/** Plugin Name: Audita Category Templates
 * Description: Selects versioned landing templates for posts by category.
 * Version: 1.0.0
 */
defined('ABSPATH') || exit;
function audita_category_template_registry(): array { return ['debitos-indevidos-itau' => 'itau-debitos']; }
function audita_category_template_for_post(?WP_Post $post = null): ?string {
    $post ??= get_post(); if (!$post || $post->post_type !== 'post') return null;
    foreach (audita_category_template_registry() as $category => $template) if (has_category($category, $post)) return $template;
    return null;
}
function audita_category_template_asset(string $path): string { return WPMU_PLUGIN_URL . '/audita-category-templates/assets/' . ltrim($path, '/'); }
add_filter('single_template', static function (string $template): string {
    $landing = audita_category_template_for_post(); $candidate = WPMU_PLUGIN_DIR . "/audita-category-templates/templates/{$landing}.php";
    return $landing && is_file($candidate) ? $candidate : $template;
});
add_action('wp_enqueue_scripts', static function (): void {
    if (!is_singular('post') || !audita_category_template_for_post()) return;
    $base = WPMU_PLUGIN_DIR . '/audita-category-templates/assets/';
    wp_enqueue_style('audita-category-template', audita_category_template_asset('charge-analysis.css'), [], (string) filemtime($base . 'charge-analysis.css'));
    wp_enqueue_script('audita-category-template', audita_category_template_asset('charge-analysis.js'), [], (string) filemtime($base . 'charge-analysis.js'), true);
});
add_filter('body_class', static function (array $classes): array { if (audita_category_template_for_post()) $classes[] = 'audita-category-template'; return $classes; });
add_filter('mod_rewrite_rules', static function (string $rules): string {
    return str_replace(['RewriteBase /conteudo/', 'RewriteRule . /conteudo/index.php'], ['RewriteBase /', 'RewriteRule . /index.php'], $rules);
});
add_action('admin_notices', static function (): void {
    $post = get_post(); if (!$post || $post->post_type !== 'post') return;
    $mapped = array_filter(array_keys(audita_category_template_registry()), static fn(string $slug): bool => has_category($slug, $post));
    if (count($mapped) > 1) echo '<div class="notice notice-warning"><p>Este post possui mais de uma categoria com modelo Audita. O primeiro modelo registrado será utilizado.</p></div>';
});
