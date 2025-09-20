import fileinclude from "gulp-file-include";
import avifWebpHTML  from "gulp-avif-webp-html"

export const html = () => {
  return app.gulp.src(`${app.path.srcFolder}/html/*.html`, { soursemaps: true })
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "HTML",
      message: "Error: <%= error.message %>"
    })))
    .pipe(fileinclude())
    .pipe(avifWebpHTML())
    .pipe(app.gulp.dest(`${app.path.buildFolder}/`))
    .pipe(app.plugins.browsersync.stream())
}