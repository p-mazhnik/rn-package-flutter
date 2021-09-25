require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../../package.json')))

Pod::Spec.new do |s|
  s.name = "FlutterModuleFrameworks-Profile"
  s.version = package['version']
  s.summary = 'FlutterModuleFrameworks'
  s.description = package['description']
  s.license = package['license']
  s.homepage = package['homepage']

  s.source = { :http => "file://#{__dir__}/../../build/ios/framework/Profile.zip"}
  s.authors      = { package['author']['name'] => package['author']['url'] }
  s.platforms    = { :ios => "11.0" }
  s.swift_version = '5.0'
  s.source_files = "**/*.{swift,h,m}"
  s.vendored_frameworks = '**/*.xcframework'
  s.preserve_paths = "**/*.xcframework"
  s.xcconfig = { 'FRAMEWORK_SEARCH_PATHS' => "'${PODS_ROOT}/FlutterModuleFrameworks-Profile'"}
  s.requires_arc = true
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }
end
